import UserRepository from "../repository/UserRepository"
import User from "../../domain/entities/User"

export default class RegisterUser {
  constructor(readonly userRepository: UserRepository) {}
  async execute(input: Input) {
    const user = await this.userRepository.findByEmail(input.email)
    if (user) {
      throw new Error("Usuário já existe")
    }
    await this.userRepository.save(
      User.create(input.name, input.email, input.password)
    )
  }
}

type Input = {
  name: string
  email: string
  password: string
}
