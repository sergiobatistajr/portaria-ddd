import GuestRepository from "../repository/GuestRepository"

export default class FindGuestInsideFiltered {
  private static instance: FindGuestInsideFiltered
  private constructor(readonly guestRepository: GuestRepository) {}
  public static getInstance(
    guestRepository: GuestRepository
  ): FindGuestInsideFiltered {
    if (!FindGuestInsideFiltered.instance) {
      FindGuestInsideFiltered.instance = new FindGuestInsideFiltered(
        guestRepository
      )
    }
    return FindGuestInsideFiltered.instance
  }
  async execute(query: string, currentPage: number, itemsPerPage: number = 10) {
    const status = "inside"
    const offset = (currentPage - 1) * itemsPerPage
    const guests = await this.guestRepository.findGuestsFiltered(
      query,
      status,
      itemsPerPage,
      offset
    )
    return guests
  }
}
