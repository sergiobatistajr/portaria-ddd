import UserRepository from "../repository/UserRepository"
import User from "../../domain/entities/User"
import HashPassword from "../../domain/shared/HashPassword"
import StrongPassword from "../../domain/shared/StrongPassword"

export default class RegisterUser {
  private static instance: RegisterUser
  private constructor(readonly userRepository: UserRepository) {}
  public static getInstance(userRepository: UserRepository): RegisterUser {
    if (!RegisterUser.instance) {
      RegisterUser.instance = new RegisterUser(userRepository)
    }
    return RegisterUser.instance
  }
  async execute(input: Input): Promise<Output> {
    const status = "active"
    const password = StrongPassword.validate(input.password)
    const confirmPassword = StrongPassword.validate(input.confirmPassword)
    const user = await this.userRepository.findByEmail(input.email)
    if (user) {
      throw new Error("Usuário já existe")
    }
    if (password === confirmPassword) {
      const hash = HashPassword.hash(password)
      await this.userRepository.save(
        User.create(input.name, input.email, hash, input.role, status)
      )
    }
  }
}

type Input = {
  name: string
  email: string
  role: string
  password: string
  confirmPassword: string
}

type Output = void
