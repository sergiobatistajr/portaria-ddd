import { Express } from "express"
import FindAllGuestFiltered from "../core/application/usecase/FindAllGuestFiltered"

export default class FindAllGuestsFilteredController {
  constructor(
    readonly server: Express,
    readonly useCase: FindAllGuestFiltered,
    ...middleware: any[]
  ) {
    server.get("/guests-all", ...middleware, async (req, res) => {
      try {
        const query = (req.query.query as string) || ""
        const currentPage = parseInt(req.query.currentPage as string) || 1
        const guests = await useCase.execute(query, currentPage)
        return res.status(200).json(guests).end()
      } catch (error) {
        if (error instanceof Error) {
          return res.status(500).send(error.message).end()
        }
      }
    })
  }
}
