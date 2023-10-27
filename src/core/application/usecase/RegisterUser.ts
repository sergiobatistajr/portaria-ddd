import UserRepository from "../repository/UserRepository"
import User from "../../domain/entities/User"
import HashPassword from "../../domain/shared/HashPassword"
import StrongPassword from "../../domain/shared/StrongPassword"

export default class RegisterUser {
  constructor(readonly userRepository: UserRepository) {}
  async execute(input: Input): Promise<Output> {
    const user = await this.userRepository.findByEmail(input.email)
    if (user) {
      throw new Error("Usuário já existe")
    }
    const hash = HashPassword.hash(StrongPassword.validate(input.password))
    await this.userRepository.save(User.create(input.name, input.email, hash))
  }
}

type Input = {
  name: string
  email: string
  password: string
}

type Output = void
