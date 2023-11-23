import { Express } from "express"
import CountAllGuestFilteredPage from "../core/application/usecase/CountAllGuestFilteredPage"

export default class CountAllGuestsFilteredPageController {
  constructor(
    readonly server: Express,
    readonly useCase: CountAllGuestFilteredPage,
    ...middleware: any[]
  ) {
    server.get("/guests-all/count", ...middleware, async (req, res) => {
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
