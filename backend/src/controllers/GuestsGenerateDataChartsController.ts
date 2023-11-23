import { Express } from "express"
import GuestsGenerateDataCharts from "../core/application/usecase/GuestsGenerateDataCharts"
export default class GuestsGenerateDataChartsController {
  constructor(
    readonly server: Express,
    readonly useCase: GuestsGenerateDataCharts,
    ...middleware: any[]
  ) {
    server.get("/guests/chart", ...middleware, async (req, res) => {
      try {
        const chartData = await useCase.execute()
        return res.status(200).json(chartData).end()
      } catch (error) {
        if (error instanceof Error) {
          return res.status(500).send(error.message).end()
        }
      }
    })
  }
}
