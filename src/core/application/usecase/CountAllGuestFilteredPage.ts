import GuestRepository from "../repository/GuestRepository"

export default class CountAllGuestFilteredPage {
  private static instance: CountAllGuestFilteredPage
  private constructor(private readonly guestRepository: GuestRepository) {}
  public static getInstance(
    guestRespository: GuestRepository
  ): CountAllGuestFilteredPage {
    if (!CountAllGuestFilteredPage.instance) {
      CountAllGuestFilteredPage.instance = new CountAllGuestFilteredPage(
        guestRespository
      )
    }
    return CountAllGuestFilteredPage.instance
  }

  async execute(query: string, itemsPerPage: number = 10) {
    const countResult = await this.guestRepository.countAllGuestFilteredPage(
      query
    )
    const totalPages = Math.ceil(countResult / itemsPerPage)
    return totalPages
  }
}
