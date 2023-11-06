import GuestRepository from "@/core/application/repository/GuestRepository"
import Guest from "@/core/domain/entities/Guest"
import pgp from "pg-promise"
export default class GuestRepositoryDatabase implements GuestRepository {
  async findByIdAndStatus(id: string, status: string): Promise<Guest | null> {
    const db = pgp()("postgres://admin:admin@localhost:5432/app")
    const selectSQL = `select * from portaria.guest where id = ${id} and status = ${status}`
    const guest = await db.oneOrNone<Guest>(selectSQL)
    await db.$pool.end()
    return guest
  }
  async findByPlateAndStatus(
    plate: string,
    status: string
  ): Promise<Guest | null> {
    const db = pgp()("postgres://admin:admin@localhost:5432/app")
    const selectSQL = `select * from portaria.guest where plate = ${plate} and status = ${status},`
    const guest = await db.oneOrNone<Guest>(selectSQL)
    await db.$pool.end()
    return guest
  }
  async save(guest: Guest): Promise<void> {
    const db = pgp()("postgres://admin:admin@localhost:5432/app")
    const insertSQL = `insert into portaria.guest( 
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
    ) values(
      ${guest.id},
      ${guest.name},
      ${guest.entryDate},
      ${guest.plate},
      ${guest.model},
      ${guest.pax},
      ${guest.apartment},
      ${guest.createdBy},
      ${guest.observation},
      ${guest.departureDate},
      ${guest.status}
      )`
    await db.none(insertSQL)
    await db.$pool.end()
  }
  async update(guest: Guest): Promise<void> {
    const db = pgp()("postgres://admin:admin@localhost:5432/app")
    await db.$pool.end()
  }
}
