import UserRepository from "../repository/UserRepository"

export default class FindFilteredUsers {
  constructor(readonly userRepository: UserRepository) {}

  async execute(query: string, currentPage: number) {
    const users = await this.userRepository.findFilteredUsers(
      query,
      currentPage
    )

    return users
  }
}
