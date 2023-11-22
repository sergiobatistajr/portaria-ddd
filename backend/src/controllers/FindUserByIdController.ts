import { Express } from "express"
import FindUserById from "../core/application/usecase/FindUserById"

export default class FindUserByIdController {
  constructor(
    readonly server: Express,
    readonly useCase: FindUserById,
    ...middleware: any[]
  ) {
    server.get("/users/:id", ...middleware, async (req, res) => {
      try {
        const { id } = req.params
        const user = await useCase.execute(id)
        return res.status(200).json(user).end()
      } catch (error) {
        if (error instanceof Error) {
          return res.status(500).send(error.message).end()
        }
      }
    })
  }
}
