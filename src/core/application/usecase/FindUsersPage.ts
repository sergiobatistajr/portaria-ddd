import UserRepository from "../repository/UserRepository"

export default class FindUsersPage {
  constructor(readonly userRepository: UserRepository) {}

  async execute(query: string) {
    return await this.userRepository.findUsersPage(query)
  }
}
