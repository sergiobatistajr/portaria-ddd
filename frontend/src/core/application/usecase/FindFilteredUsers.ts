import UserRepository from "../repository/UserRepository"

export default class FindFilteredUsers {
  private static instance: FindFilteredUsers
  private constructor(readonly userRepository: UserRepository) {}
  public static getInstance(userRepository: UserRepository): FindFilteredUsers {
    if (!FindFilteredUsers.instance) {
      FindFilteredUsers.instance = new FindFilteredUsers(userRepository)
    }
    return FindFilteredUsers.instance
  }
  async execute(query: string, currentPage: number, itemsPerPage: number = 10) {
    const offset = (currentPage - 1) * itemsPerPage
    const users = await this.userRepository.findFilteredUsers(
      query,
      itemsPerPage,
      offset
    )
    return users
  }
}
