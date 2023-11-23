import { Express } from "express"
import RegisterGuestEntry from "../core/application/usecase/RegisterGuestEntry"

export default class RegisterGuestEntryController {
  constructor(
    readonly server: Express,
    readonly useCase: RegisterGuestEntry,
    ...middleware: any[]
  ) {
    server.post("/guests", ...middleware, async (req, res) => {
      try {
        const {
          name,
          entryDate,
          createdBy,
          plate,
          model,
          pax,
          apartment,
          observation,
        } = req.body
        await useCase.execute({
          createdBy,
          entryDate,
          name,
          apartment,
          model,
          observation,
          pax,
          plate,
        })
        return res.status(200).end()
      } catch (error) {
        if (error instanceof Error) {
          return res.status(500).send(error.message).end()
        }
      }
    })
  }
}
