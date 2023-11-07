import UserRepository from "../../application/repository/UserRepository"
import User from "../../domain/entities/User"
import pgp from "pg-promise"

export default class UserRegisterRepositoryDatabase implements UserRepository {
  async findFilteredUsers(
    query: string,
    itemsPerPage: number,
    offset: number
  ): Promise<User[]> {
    const db = pgp()("postgres://admin:admin@localhost:5432/app")
    const users = await db.any(
      "select * from portaria.user where email ilike $1 limit $2 offset $3",
      [`%${query}%`, itemsPerPage, offset]
    )
    await db.$pool.end()
    return users.map((user) =>
      User.create(user.name, user.email, user.password, user.id)
    )
  }
  async countUsersPage(query: string): Promise<number> {
    const db = pgp()("postgres://admin:admin@localhost:5432/app")
    const { count } = await db.one(
      "select count(*) from portaria.user where email ilike $1",
      [`%${query}%`]
    )
    await db.$pool.end()
    return count
  }
  async findByEmail(email: string): Promise<User | null> {
    const db = pgp()("postgres://admin:admin@localhost:5432/app")
    const user = await db.oneOrNone(
      "select * from portaria.user where email = $1",
      [email]
    )
    await db.$pool.end()
    return user
      ? User.create(user.name, user.email, user.password, user.id)
      : null
  }

  async save(user: User): Promise<void> {
    const db = pgp()("postgres://admin:admin@localhost:5432/app")
    await db.none(
      "insert into portaria.user (id, name, email, password) values ($1, $2, $3, $4)",
      [user.id, user.name, user.email, user.password]
    )
    await db.$pool.end()
  }
  async delete(id: string): Promise<void> {
    const db = pgp()("postgres://admin:admin@localhost:5432/app")
    await db.none("delete from portaria.user where id = $1", [id])
    await db.$pool.end()
  }
}
