import GuestRepository from "../repository/GuestRepository"

export default class GuestsGenerateDataCharts {
  private static instance: GuestsGenerateDataCharts
  private constructor(private readonly guestRepository: GuestRepository) {}
  static getInstance(guestRepository: GuestRepository) {
    if (!GuestsGenerateDataCharts.instance) {
      GuestsGenerateDataCharts.instance = new GuestsGenerateDataCharts(
        guestRepository
      )
    }
    return GuestsGenerateDataCharts.instance
  }
  async execute(): Promise<Output> {
    const currentYear = new Date().getFullYear().toString()
    const months = [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
    ]
    const monthsNames = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ]

    const promises = months.map((month) =>
      this.guestRepository.findAllByMonthAndYear(`${month}/${currentYear}`)
    )

    const results = await Promise.all(promises)

    const output = results.map((result, index) => ({
      month: monthsNames[index],
      total: result.length,
    }))

    return output
  }
}
type Output = {
  month: string
  total: number
}[]
