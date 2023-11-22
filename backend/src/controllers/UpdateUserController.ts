import { Express } from "express"
import UpdateUser from "../core/application/usecase/UpdateUser"

export default class UpdateUserController {
  constructor(
    readonly server: Express,
    useCase: UpdateUser,
    ...middleware: any[]
  ) {
    server.patch("/users/:id", ...middleware, async (req, res) => {
      try {
        const { id } = req.params
        const { email, name, role, status } = req.body
        await useCase.execute({ email, id, name, role, status })
        return res.status(200).end()
      } catch (error) {
        if (error instanceof Error) {
          return res.status(500).send(error.message).end()
        }
      }
    })
  }
}
