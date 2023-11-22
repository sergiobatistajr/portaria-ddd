import FindFilteredUsers from "../core/application/usecase/FindFilteredUsers"
import { Express } from "express"
export default class FindFilteredUserController {
  constructor(
    readonly server: Express,
    readonly useCase: FindFilteredUsers,
    ...middleware: any[]
  ) {
    server.get("/users", ...middleware, async (req, res) => {
      try {
        const query = req.query.query?.toString() || ""
        const currentPage = Number(req.query.currentPage) || 1
        const users = await useCase.execute(query, currentPage)
        return res.status(200).json(users).end()
      } catch (error) {
        if (error instanceof Error) {
          return res.status(500).send(error.message).end
        }
      }
    })
  }
}
