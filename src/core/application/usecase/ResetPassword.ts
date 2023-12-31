import UserRepository from "../repository/UserRepository"
import HashPassword from "../../domain/shared/HashPassword"
import StrongPassword from "../../domain/shared/StrongPassword"

export default class ResetPassword {
  private static intance: ResetPassword
  private constructor(private readonly userRepository: UserRepository) {}
  static getInstance(userRepository: UserRepository): ResetPassword {
    if (!ResetPassword.intance) {
      ResetPassword.intance = new ResetPassword(userRepository)
    }
    return ResetPassword.intance
  }
  async execute(input: Input) {
    if (input.confirmPassword !== input.password) {
      throw new Error("Senhas não são iguais.")
    }
    const hash = HashPassword.hash(StrongPassword.validate(input.password))
    await this.userRepository.resetPassword(input.id, hash)
  }
}

type Input = {
  id: string
  password: string
  confirmPassword: string
}
