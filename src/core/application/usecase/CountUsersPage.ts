import UserRepository from "../repository/UserRepository"

export default class CountUsersPage {
  private static instance: CountUsersPage
  private constructor(readonly userRepository: UserRepository) {}
  public static getInstance(userRepository: UserRepository): CountUsersPage {
    if (!CountUsersPage.instance) {
      CountUsersPage.instance = new CountUsersPage(userRepository)
    }
    return CountUsersPage.instance
  }
  async execute(query: string, itemsPerPage: number = 10) {
    const countResult = await this.userRepository.countUsersPage(query)
    const totalPages = Math.ceil(countResult / itemsPerPage)
    return totalPages
  }
}
