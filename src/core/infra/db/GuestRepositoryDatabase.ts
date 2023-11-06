import GuestRepository from "@/core/application/repository/GuestRepository"
import Guest from "@/core/domain/entities/Guest"
import pgp from "pg-promise"

export default class GuestRepositoryDatabase implements GuestRepository {
  findByIdAndStatus(id: string, status: string): Promise<Guest | null> {
    throw new Error("Method not implemented.")
  }

  async findByNameAndStatusWithOutPlate(
    name: string,
    status: string
  ): Promise<Guest | null> {
    const db = pgp()("postgres://admin:admin@localhost:5432/app")
    const guest = await db.oneOrNone<Guest>(
      "select * from portaria.guest where name = $1 and status = $2 and plate is null",
      [name, status]
    )
    await db.$pool.end()
    return guest
  }

  async findByPlateAndStatus(
    plate: string,
    status: string
  ): Promise<Guest | null> {
    const db = pgp()("postgres://admin:admin@localhost:5432/app")
    const guest = await db.oneOrNone<Guest>(
      "select * from portaria.guest where plate = $1 and status = $2",
      [plate, status]
    )
    await db.$pool.end()
    return guest
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
