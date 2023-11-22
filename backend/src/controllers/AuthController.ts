import LoginUser from "../core/application/usecase/LoginUser"
import RegisterUser from "../core/application/usecase/RegisterUser"
import { Request, Response } from "express"
import JWTProvider from "../core/domain/shared/JWTProvider"

interface Usecases {
  loginUser: LoginUser
  registerUser: RegisterUser
}
export default class AuthController {
  constructor(private readonly usecase: Usecases) {}

  async login(input: Input): Promise<Output> {
    const { req, res } = input
    const { email, password } = req.body
    try {
      const user = await this.usecase.loginUser.execute({ email, password })
      const token = JWTProvider.sign({
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
        userRole: user.role,
      })
      res.setHeader("Authorization", `Bearer ${token}`)
      return res.status(201).end()
    } catch (error) {
      if (error instanceof Error) {
        return res.status(401).json({ message: error.message })
      }
    }
    return res.status(500).json({ message: "Unexpected error" })
  }
  async resgiter(input: Input): Promise<Output> {
    const { req, res } = input
    const { email, password, confirmPassword, name, role } = req.body
    try {
      await this.usecase.registerUser.execute({
        confirmPassword,
        email,
        name,
        password,
        role,
      })
      return res.status(200).end()
    } catch (error) {
      if (error instanceof Error) {
        return res.status(401).json({ message: error.message })
      }
    }
    return res.status(500).json({ message: "Unexpected error" })
  }
}

type Input = {
  req: Request
  res: Response
}

type Output = Response
