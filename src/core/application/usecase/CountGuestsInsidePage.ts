import GuestRepository from "../repository/GuestRepository"

export default class CountGuestsInsidePage {
  constructor(readonly guestRepository: GuestRepository) {}

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
