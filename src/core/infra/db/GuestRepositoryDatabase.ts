import GuestRepository from "@/core/application/repository/GuestRepository"
import Guest from "@/core/domain/entities/Guest"
import pgp from "pg-promise"

export default class GuestRepositoryDatabase implements GuestRepository {
  async findGuestsFiltered(
    query: string,
    status: string,
    itemsPerPage: number,
    offset: number
  ): Promise<Guest[]> {
    const db = pgp()("postgres://admin:admin@localhost:5432/app")
    const selectSQL =
      "select * from portaria.guest where (name ilike $1 or plate ilike $2) and status = $3 limit $4 offset $5"
    const guests = await db.any(selectSQL, [
      `%${query}%`,
      `%${query}%`,
      status,
      itemsPerPage,
      offset,
    ])
    await db.$pool.end()
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
    const db = pgp()("postgres://admin:admin@localhost:5432/app")
    const countSQL =
      "select * from portaria.guest where (name ilike $1 or plate ilike $2) and status = $3"
    const count = await db.one<number>(countSQL, [
      `%${query}%`,
      `%${query}%`,
      status,
    ])
    await db.$pool.end()
    return count
  }
  findByIdAndStatus(id: string, status: string): Promise<Guest | null> {
    throw new Error("Method not implemented.")
  }

  async findByNameAndStatusWithOutPlate(
    name: string,
    status: string
  ): Promise<Guest | null> {
    const db = pgp()("postgres://admin:admin@localhost:5432/app")
    const guest = await db.oneOrNone(
      "select * from portaria.guest where name = $1 and status = $2 and plate is null",
      [name, status]
    )
    await db.$pool.end()
    return Guest.create(
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
  }

  async findByPlateAndStatus(
    plate: string,
    status: string
  ): Promise<Guest | null> {
    const db = pgp()("postgres://admin:admin@localhost:5432/app")
    const guest = await db.oneOrNone(
      "select * from portaria.guest where plate = $1 and status = $2",
      [plate, status]
    )
    await db.$pool.end()
    return Guest.create(
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
  }

  async save(guest: Guest): Promise<void> {
    const db = pgp()("postgres://admin:admin@localhost:5432/app")
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
    await db.none(insertSQL, [
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
    await db.$pool.end()
  }
  async update(guest: Guest): Promise<void> {
    const db = pgp()("postgres://admin:admin@localhost:5432/app")
    await db.$pool.end()
  }
}
