import HashPassword from "../../domain/shared/HashPassword"
import UserRepository from "../repository/UserRepository"

export default class LoginUser {
  private static instance: LoginUser
  private constructor(readonly userRepository: UserRepository) {}
  public static getInstance(userRepository: UserRepository): LoginUser {
    if (!LoginUser.instance) {
      LoginUser.instance = new LoginUser(userRepository)
    }
    return LoginUser.instance
  }
  async execute(input: Input): Promise<Output> {
    const user = await this.userRepository.findByEmail(input.email)
    if (!user) {
      throw new Error("Usuário não registrado")
    }
    const isValid = HashPassword.verify(input.password, user.password)
    if (!isValid) {
      throw new Error("Senha inválida")
    }
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      status: user.status,
    }
  }
}

type Input = {
  email: string
  password: string
}
type Output = {
  id: string
  email: string
  name: string
  role: string
  status: string
}
