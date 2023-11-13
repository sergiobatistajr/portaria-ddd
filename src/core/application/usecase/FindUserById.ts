import UserRepository from "../repository/UserRepository"

export default class FindUserById {
  private static instace: FindUserById
  private constructor(private readonly userRepository: UserRepository) {}

  static getInstance(userRepository: UserRepository): FindUserById {
    if (!FindUserById.instace) {
      FindUserById.instace = new FindUserById(userRepository)
    }
    return FindUserById.instace
  }
  async execute(id: string) {
    const user = await this.userRepository.findById(id)
    return user
  }
}
