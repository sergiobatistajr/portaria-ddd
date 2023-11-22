import { Express } from "express"
import CountUsersPage from "../core/application/usecase/CountUsersPage"

export default class CountUsersPageController {
  constructor(
    readonly server: Express,
    readonly useCase: CountUsersPage,
    ...middleware: any[]
  ) {
    server.get("/users/count", ...middleware, async (req, res) => {
      try {
        const query = (req.query.query as string) || ""
        const totalPages = await useCase.execute(query)
        return res.status(200).json(totalPages).end()
      } catch (error) {
        if (error instanceof Error) {
          return res.status(500).send(error.message).end()
        }
      }
    })
  }
}
