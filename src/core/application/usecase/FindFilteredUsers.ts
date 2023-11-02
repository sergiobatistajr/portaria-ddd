import UserRepository from "../repository/UserRepository"

export default class FindFilteredUsers {
  constructor(readonly userRepository: UserRepository) {}

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
