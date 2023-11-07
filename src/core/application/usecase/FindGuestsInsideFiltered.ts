import GuestRepository from "../repository/GuestRepository"

export default class FindGuestInsideFiltered {
  constructor(readonly guestRepository: GuestRepository) {}

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
