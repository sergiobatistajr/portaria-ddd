import GuestRepository from "@/core/application/repository/GuestRepository"
import Guest from "../../domain/entities/Guest"
import { IDatabase } from "pg-promise"

export default class GuestRepositoryDatabase implements GuestRepository {
  private static instance: GuestRepositoryDatabase
  private constructor(private db: IDatabase<any>) {}
  public static getInstance(db: IDatabase<any>): GuestRepositoryDatabase {
    if (!GuestRepositoryDatabase.instance) {
      GuestRepositoryDatabase.instance = new GuestRepositoryDatabase(db)
    }
    return GuestRepositoryDatabase.instance
  }
  async findGuestsFiltered(
    query: string,
    status: string,
    itemsPerPage: number,
    offset: number
  ): Promise<Guest[]> {
    const selectSQL =
      "select * from portaria.guest where (name ilike $1 or plate ilike $2) and status = $3 limit $4 offset $5"
    const guests = await this.db.any(selectSQL, [
      `%${query}%`,
      `%${query}%`,
      status,
      itemsPerPage,
      offset,
    ])

    return guests.map((guest) =>
      Guest.create(
        guest.name,
        guest.entrydate,
        guest.createdby,
        guest.plate,
        guest.model,
        parseInt(guest.pax),
        parseInt(guest.apartment),
        guest.observation,
        guest.status,
        guest.departuredate,
        guest.id
      )
    )
  }
  async countGuestsPage(query: string, status: string): Promise<number> {
    const countSQL =
      "select count(*) from portaria.guest where (name ilike $1 or plate ilike $2) and status = $3"
    const result = await this.db.one<{ count: number }>(countSQL, [
      `%${query}%`,
      `%${query}%`,
      status,
    ])

    return result.count
  }
  findByIdAndStatus(id: string, status: string): Promise<Guest | null> {
    throw new Error("Method not implemented.")
  }

  async findByNameAndStatusWithOutPlate(
    name: string,
    status: string
  ): Promise<Guest | null> {
    const guest = await this.db.oneOrNone(
      "select * from portaria.guest where name = $1 and status = $2 and plate is null",
      [name, status]
    )

    return guest
      ? Guest.create(
          guest.name,
          guest.entrydate,
          guest.createdby,
          guest.plate,
          guest.model,
          parseInt(guest.pax),
          parseInt(guest.apartment),
          guest.observation,
          guest.status,
          guest.departuredate,
          guest.id
        )
      : null
  }

  async findByPlateAndStatus(
    plate: string,
    status: string
  ): Promise<Guest | null> {
    const guest = await this.db.oneOrNone(
      "select * from portaria.guest where plate = $1 and status = $2",
      [plate, status]
    )

    return guest
      ? Guest.create(
          guest.name,
          guest.entrydate,
          guest.createdby,
          guest.plate,
          guest.model,
          parseInt(guest.pax),
          parseInt(guest.apartment),
          guest.observation,
          guest.status,
          guest.departuredate,
          guest.id
        )
      : null
  }

  async save(guest: Guest): Promise<void> {
    const insertSQL = `insert into portaria.guest ( 
    id,
    name,
    entryDate,
    plate,
    model,
    pax,
    apartment,
    createdBy,
    observation,
    departureDate,
    status
    ) values (
      $1,
      $2,
      $3,
      $4,
      $5,
      $6,
      $7,
      $8,
      $9,
      $10,
      $11
    )`
    await this.db.none(insertSQL, [
      guest.id,
      guest.name,
      guest.entryDate,
      guest.plate,
      guest.model,
      guest.pax,
      guest.apartment,
      guest.createdBy,
      guest.observation,
      guest.departureDate,
      guest.status,
    ])
  }
  async update(guest: Guest): Promise<void> {
    return
  }
}
