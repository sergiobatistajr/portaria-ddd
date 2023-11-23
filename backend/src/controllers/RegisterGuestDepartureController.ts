import { Express } from "express"
import RegisterGuestDeparture from "../core/application/usecase/RegisterGuestDeparture"

export default class RegisterGuestDepartureController {
  constructor(
    readonly server: Express,
    useCase: RegisterGuestDeparture,
    ...middleware: any[]
  ) {
    server.patch("/guests/:id", ...middleware, async (req, res) => {
      try {
        const { id } = req.params
        const { departureDate } = req.body
        await useCase.execute({ id, departureDate })
        return res.status(200).end()
      } catch (error) {
        if (error instanceof Error) {
          return res.status(500).send(error.message).end()
        }
      }
    })
  }
}
