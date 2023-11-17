import GuestRepository from "../repository/GuestRepository"

export default class CountGuestsInsideFilteredPage {
  private static instance: CountGuestsInsideFilteredPage
  private constructor(readonly guestRepository: GuestRepository) {}
  public static getInstance(
    guestRepository: GuestRepository
  ): CountGuestsInsideFilteredPage {
    if (!CountGuestsInsideFilteredPage.instance) {
      CountGuestsInsideFilteredPage.instance =
        new CountGuestsInsideFilteredPage(guestRepository)
    }
    return CountGuestsInsideFilteredPage.instance
  }
  async execute(query: string, itemsPerPage: number = 10) {
    const status = "inside"
    const countResult =
      await this.guestRepository.countGuestsFilteredWStatusPage(query, status)
    const totalPages = Math.ceil(countResult / itemsPerPage)
    return totalPages
  }
}
