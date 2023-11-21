import LoginUser from "../core/application/usecase/LoginUser"
import RegisterUser from "../core/application/usecase/RegisterUser"
import { Request, Response } from "express"
import UserStatus from "../core/domain/shared/UserStatus"

interface Usecases {
  loginUser: LoginUser
  registerUser: RegisterUser
}
export default class AuthController {
  constructor(private readonly usecase: Usecases) {}

  async login(input: Input): Promise<Output> {
    const { req, res } = input
    const { email, password } = req.body
    const user = await this.usecase.loginUser.execute({ email, password })
    return res.status(200).json(UserStatus)
  }
  async resgiter(input: Input): Promise<Output> {
    const { req, res } = input
    const { email, password, confirmPassword, name, role } = req.body
    await this.usecase.registerUser.execute({
      confirmPassword,
      email,
      name,
      password,
      role,
    })
    return res.status(200).send("sucesso").end()
  }
}

type Input = {
  req: Request
  res: Response
}

type Output = Response
