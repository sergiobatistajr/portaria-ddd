import { Express } from "express"
import VerifyUsersRegisters from "../core/application/usecase/VerifyUsersRegisters"

export default class VerifyUsersRegistersController {
  constructor(
    readonly server: Express,
    readonly useCase: VerifyUsersRegisters,
    ...middleware: any[]
  ) {
    server.get("/verify-registers", ...middleware, async (req, res) => {
      try {
        const output = await useCase.execute()
        return res.status(200).json(output).end()
      } catch (error: unknown) {
        if (error instanceof Error) {
          return res.status(500).send(error).end()
        }
      }
    })
  }
}
