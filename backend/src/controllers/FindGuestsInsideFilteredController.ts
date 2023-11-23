import { Express } from "express"
import FindGuestInsideFiltered from "../core/application/usecase/FindGuestsInsideFiltered"

export default class FindGuestsInsideFilteredController {
  constructor(
    readonly server: Express,
    useCase: FindGuestInsideFiltered,
    ...middleware: any[]
  ) {
    server.get("/guests-inside", ...middleware, async (req, res) => {
      try {
        const query = (req.query.query as string) || ""
        const currentPage = parseInt(req.query.currentPage as string) || 1
        const guestsInside = await useCase.execute(query, currentPage)
        return res.status(200).json(guestsInside).end()
      } catch (error) {
        if (error instanceof Error) {
          return res.status(500).send(error.message).end()
        }
      }
    })
  }
}
