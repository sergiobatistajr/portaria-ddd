import GuestRepository from "../repository/GuestRepository"

export default class FindAllGuestFiltered {
  private static instance: FindAllGuestFiltered
  private constructor(private readonly guestRepository: GuestRepository) {}
  public static getInstance(
    guestRepository: GuestRepository
  ): FindAllGuestFiltered {
    if (!FindAllGuestFiltered.instance) {
      FindAllGuestFiltered.instance = new FindAllGuestFiltered(guestRepository)
    }
    return FindAllGuestFiltered.instance
  }
  async execute(query: string, currentPage: number, itemsPerPage: number = 10) {
    const offset = (currentPage - 1) * itemsPerPage
    const guests = await this.guestRepository.findAllGuestFiltered(
      query,
      itemsPerPage,
      offset
    )
    return guests
  }
}
