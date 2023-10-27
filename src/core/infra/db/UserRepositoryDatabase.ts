import UserRepository from "../../application/repository/UserRepository"
import User from "../../domain/entities/User"
import pgp from "pg-promise"

export default class UserRegisterRepositoryDatabase implements UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const connection = pgp()("postgres://admin:admin@localhost:5432/app")
    const [user] = await connection.query(
      "select * from portaria.user where email = $1",
      [email]
    )
    await connection.$pool.end()
    return user
      ? User.create(user.name, user.email, user.password, user.id)
      : null
  }

  async save(user: User): Promise<void> {
    const connection = pgp()("postgres://admin:admin@localhost:5432/app")
    await connection.query(
      "insert into portaria.user (id, name, email, password) values ($1, $2, $3, $4)",
      [user.id, user.name, user.email, user.password]
    )
    await connection.$pool.end()
  }
  async delete(id: string): Promise<void> {
    const connection = pgp()("postgres://admin:admin@localhost:5432/app")
    await connection.query("delete from portaria.user where id = $1", [id])
    await connection.$pool.end()
  }
}
