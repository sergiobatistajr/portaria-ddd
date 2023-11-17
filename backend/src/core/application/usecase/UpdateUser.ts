import User from "../../domain/entities/User"
import UserRepository from "../repository/UserRepository"

export default class UpdateUser {
  private static instance: UpdateUser
  private constructor(private readonly userRepository: UserRepository) {}

  static getInstance(userRepository: UserRepository): UpdateUser {
    if (!UpdateUser.instance) {
      UpdateUser.instance = new UpdateUser(userRepository)
    }
    return UpdateUser.instance
  }

  async execute(input: Input): Promise<void> {
    const user = await this.userRepository.findById(input.id)
    if (!user) {
      throw new Error("Usuário não existe")
    }
    if (input.email !== user.email) {
      const isEmail = await this.userRepository.findByEmail(input.email)
      if (isEmail) {
        throw new Error("Email em uso.")
      }
    }
    await this.userRepository.update(
      User.create({
        id: input.id,
        name: input.name,
        email: input.email,
        role: input.role,
        status: input.status,
      })
    )
  }
}
type Input = {
  id: string
  name: string
  email: string
  role: string
  status: string
}
