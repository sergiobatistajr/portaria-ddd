import UserRepository from "../../application/repository/UserRepository"
import User from "../../domain/entities/User"
import { IDatabase } from "pg-promise"

export default class UserRepositoryDatabase implements UserRepository {
  private static instance: UserRepositoryDatabase
  private constructor(private db: IDatabase<any>) {}
  public static getInstance(db: IDatabase<any>): UserRepositoryDatabase {
    if (!UserRepositoryDatabase.instance) {
      UserRepositoryDatabase.instance = new UserRepositoryDatabase(db)
    }
    return UserRepositoryDatabase.instance
  }

  async findFilteredUsers(
    query: string,
    itemsPerPage: number,
    offset: number
  ): Promise<User[]> {
    const users = await this.db.any(
      "select * from portaria.user where email ilike $1 limit $2 offset $3",
      [`%${query}%`, itemsPerPage, offset]
    )
    return users.map((user) =>
      User.create(user.name, user.email, user.password, user.id)
    )
  }
  async countUsersPage(query: string): Promise<number> {
    const { count } = await this.db.one(
      "select count(*) from portaria.user where email ilike $1",
      [`%${query}%`]
    )
    return count
  }
  async findByEmail(email: string): Promise<User | null> {
    const user = await this.db.oneOrNone(
      "select * from portaria.user where email = $1",
      [email]
    )
    return user
      ? User.create(user.name, user.email, user.password, user.id)
      : null
  }

  async save(user: User): Promise<void> {
    await this.db.none(
      "insert into portaria.user (id, name, email, password) values ($1, $2, $3, $4)",
      [user.id, user.name, user.email, user.password]
    )
  }
  async delete(id: string): Promise<void> {
    await this.db.none("delete from portaria.user where id = $1", [id])
  }
}
