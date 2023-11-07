import UserRepository from "../repository/UserRepository"

export default class CountUsersPage {
  constructor(readonly userRepository: UserRepository) {}

  async execute(query: string, itemsPerPage: number = 10) {
    const countResult = await this.userRepository.countUsersPage(query)
    const totalPages = Math.ceil(countResult / itemsPerPage)
    return totalPages
  }
}
