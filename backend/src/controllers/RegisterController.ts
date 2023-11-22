import { Express } from "express"
import RegisterUser from "../core/application/usecase/RegisterUser"

export default class RegisterUserController {
  constructor(
    readonly server: Express,
    useCase: RegisterUser,
    ...middleware: any[]
  ) {
    server.post("/users", ...middleware, async (req, res) => {
      try {
        const { name, email, role, password, confirmPassword } = req.body
        await useCase.execute({ name, email, role, password, confirmPassword })
        return res.status(200).json(req.userId).end()
      } catch (error) {
        if (error instanceof Error)
          return res.status(500).send(error.message).end()
      }
    })
  }
}
