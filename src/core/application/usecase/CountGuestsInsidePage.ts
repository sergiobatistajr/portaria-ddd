import GuestRepository from "../repository/GuestRepository"

export default class CountGuestsInsidePage {
  private static instance: CountGuestsInsidePage
  private constructor(readonly guestRepository: GuestRepository) {}
  public static getInstance(
    guestRepository: GuestRepository
  ): CountGuestsInsidePage {
    if (!CountGuestsInsidePage.instance) {
      CountGuestsInsidePage.instance = new CountGuestsInsidePage(
        guestRepository
      )
    }
    return CountGuestsInsidePage.instance
  }
  async execute(query: string, itemsPerPage: number = 10) {
    const status = "inside"
    const countResult = await this.guestRepository.countGuestsPage(
      query,
      status
    )
    const totalPages = Math.ceil(countResult / itemsPerPage)
    return totalPages
  }
}
