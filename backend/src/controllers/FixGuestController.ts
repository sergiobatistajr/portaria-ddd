import { Express } from "express"
import FixGuest from "../core/application/usecase/FixGuest"

export default class FixGuestController {
  constructor(
    readonly server: Express,
    useCase: FixGuest,
    ...middleware: any[]
  ) {
    server.patch("/fix-guests/:id", ...middleware, async (req, res) => {
      try {
        const { id } = req.params
        const {
          name,
          entryDate,
          createdBy,
          plate,
          model,
          pax,
          apartment,
          observation,
          departureDate,
          status,
        } = req.body
        await useCase.execute({
          id,
          name,
          entryDate,
          createdBy,
          plate,
          model,
          pax,
          apartment,
          observation,
          departureDate,
          status,
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
