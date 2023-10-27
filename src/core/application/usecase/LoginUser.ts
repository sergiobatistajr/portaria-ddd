import UserRepository from "../repository/UserRepository"

export default class LoginUser {
  constructor(readonly userRepository: UserRepository) {}

  async execute(input: Input): Promise<Output> {
    const user = await this.userRepository.findByEmail(input.email)
    if (!user) {
      throw new Error("Usuário não registrado")
    }
    return {
      id: user.id,
      status: "logado",
    }
  }
}

type Input = {
  email: string
}
type Output = {
  id: string
  status: string
}
