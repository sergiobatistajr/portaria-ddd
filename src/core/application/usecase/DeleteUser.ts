import UserRepository from "../repository/UserRepository"

export default class DeleteUser {
  constructor(readonly userRepository: UserRepository) {}

  async execute(id: string): Promise<Output> {
    await this.userRepository.delete(id)
    return {
      status: "deleted",
    }
  }
}
type Output = {
  status: string
}
