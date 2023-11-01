import User from "@/core/domain/entities/User"

export default interface UserRepository {
  findByEmail(email: string): Promise<User | null>
  save(user: User): Promise<void>
  delete(id: string): Promise<void>
  findFilteredUsers(query: string, currentPage: number): Promise<User[]>
  findUsersPage(query: string): Promise<number>
}
