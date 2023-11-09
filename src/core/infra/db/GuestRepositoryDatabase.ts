import GuestRepository, {
  findAllGuestFilteredOutput,
} from "@/core/application/repository/GuestRepository"
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
  async findAllGuestFiltered(
    query: string,
    itemsPerPage: number,
    offset: number
  ): Promise<findAllGuestFilteredOutput[]> {
    const selectSQL =
      "select g.*, u.name as created_by_name from portaria.guest g left join portaria.user u on g.createdBy = u.id where g.name ilike $1 or g.plate ilike $2 or g.model ilike $3 or g.apartment::text ilike $4 or TO_CHAR(g.entryDate, 'DD/MM/YYYY, HH24:MI') ilike $5 or TO_CHAR(g.departureDate, 'DD/MM/YYYY, HH24:MI') ilike $6 or g.observation ilike $7 limit $8 offset $9"
    const guests = await this.db.any(selectSQL, [
      `%${query}%`,
      `%${query}%`,
      `%${query}%`,
      `%${query}%`,
      `%${query}%`,
      `%${query}%`,
      `%${query}%`,
      itemsPerPage,
      offset,
    ])
    return guests.map((guest) => {
      const createdGuest = Guest.create(
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
      return {
        ...createdGuest,
        created_by_name: guest.created_by_name,
      }
    })
  }
  async countAllGuestFilteredPage(query: string): Promise<number> {
    const countSQL =
      "select count(*) from portaria.guest where name ilike $1 or plate ilike $2 or model ilike $3 or apartment::text ilike $4 or TO_CHAR(entryDate, 'DD/MM/YYYY, HH24:MI') ilike $5 or TO_CHAR(departureDate, 'DD/MM/YYYY, HH24:MI') ilike $6 or observation ilike $7"
    const result = await this.db.one<{ count: number }>(countSQL, [
      `%${query}%`,
      `%${query}%`,
      `%${query}%`,
      `%${query}%`,
      `%${query}%`,
      `%${query}%`,
      `%${query}%`,
    ])
    return result.count
  }
  async findGuestsFilteredWStatus(
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
  async countGuestsFilteredWStatusPage(
    query: string,
    status: string
  ): Promise<number> {
    const countSQL =
      "select count(*) from portaria.guest where (name ilike $1 or plate ilike $2) and status = $3"
    const result = await this.db.one<{ count: number }>(countSQL, [
      `%${query}%`,
      `%${query}%`,
      status,
    ])

    return result.count
  }
  async findById(id: string): Promise<Guest | null> {
    const selectSQL = "select * from portaria.guest where id = $1"
    const guest = await this.db.oneOrNone(selectSQL, [id])
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
    const updateSQL =
      "update portaria.guest set name = $1, entryDate = $2, plate = $3, model = $4, pax = $5, apartment = $6, createdBy = $7, observation = $8, departureDate = $9, status = $10 where id = $11"
    await this.db.none(updateSQL, [
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
      guest.id,
    ])
  }
}
