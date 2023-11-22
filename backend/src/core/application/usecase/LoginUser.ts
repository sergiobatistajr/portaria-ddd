import HashPassword from "../../domain/shared/HashPassword"
import JWTProvider from "../../domain/shared/JWTProvider"
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
  async execute(input: Input) {
    if (!input.email) {
      throw new Error("Email é obrigatório")
    }
    if (!input.password) {
      throw new Error("Senha é obrigatória")
    }
    const user = await this.userRepository.findByEmail(input.email)
    if (!user) {
      throw new Error("Usuário não registrado")
    }
    if (user.status !== "active") {
      throw new Error("Usuário desativado")
    }
    const isValid = HashPassword.verify(input.password, user.password!)
    if (!isValid) {
      throw new Error("Senha inválida")
    }
    const token = JWTProvider.sign({
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      userRole: user.role,
    })

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      token: token,
    }
  }
}

type Input = {
  email: string
  password: string
}
