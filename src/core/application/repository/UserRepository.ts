import User from "@/core/domain/entities/User"

export default interface UserRepository {
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  update(user: Omit<User, "password">): Promise<void>
  save(user: User): Promise<void>
  delete(id: string): Promise<void>
  findFilteredUsers(
    query: string,
    itemsPerPage: number,
    offset: number
  ): Promise<User[]>
  countUsersPage(query: string): Promise<number>
}
