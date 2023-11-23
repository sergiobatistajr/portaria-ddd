import { Express } from "express"
import CountGuestsInsideFilteredPage from "../core/application/usecase/CountGuestsInsideFilteredPage"

export default class CountGuestsInsideFilteredPageController {
  constructor(
    readonly server: Express,
    readonly useCase: CountGuestsInsideFilteredPage,
    ...middleware: any[]
  ) {
    server.get("/guests-inside/count", ...middleware, async (req, res) => {
      try {
        const query = req.query.query as string
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
