import LoginUser from "../core/application/usecase/LoginUser"
import { Express } from "express"

export default class LoginController {
  constructor(readonly server: Express, readonly useCase: LoginUser) {
    server.post("/login", async (req, res) => {
      try {
        const { email, password } = req.body
        const token = await useCase.execute({ email, password })
        return res
          .status(200)
          .setHeader("Authorization", `Bearer ${token}`)
          .end()
      } catch (error) {
        if (error instanceof Error)
          return res.status(500).send(error.message).end()
      }
    })
  }
}