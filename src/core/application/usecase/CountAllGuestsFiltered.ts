import GuestRepository from "../repository/GuestRepository"

export default class CountAllGuestFiltered {
  private static instance: CountAllGuestFiltered
  private constructor(private readonly guestRepository: GuestRepository) {}
  public static getInstance(
    guestRespository: GuestRepository
  ): CountAllGuestFiltered {
    if (!CountAllGuestFiltered.instance) {
      CountAllGuestFiltered.instance = new CountAllGuestFiltered(
        guestRespository
      )
    }
    return CountAllGuestFiltered.instance
  }

  async execute(query: string, itemsPerPage: number = 10) {
    const countResult = await this.guestRepository.countAllGuestFilteredPage(
      query
    )
    const totalPages = Math.ceil(countResult / itemsPerPage)
    return totalPages
  }
}
