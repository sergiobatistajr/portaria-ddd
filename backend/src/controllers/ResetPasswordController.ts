import { Express } from "express"
import ResetPassword from "../core/application/usecase/ResetPassword"

export default class ResetPasswordController {
  constructor(
    readonly server: Express,
    readonly useCase: ResetPassword,
    ...midlleware: any[]
  ) {
    server.post(
      "/users/reset-password/:id",
      ...midlleware,
      async (req, res) => {
        try {
          const { id } = req.params
          const { password, confirmPassword } = req.body
          await useCase.execute({ password, confirmPassword, id })
          return res.status(200).end()
        } catch (error) {
          if (error instanceof Error) {
            return res.status(500).send(error.message).end()
          }
        }
      }
    )
  }
}
