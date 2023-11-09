import Guest from "@/core/domain/entities/Guest"
import GuestRepository from "../repository/GuestRepository"

export default class GetAllGuestFiltered {
  private static instance: GetAllGuestFiltered
  private constructor(private readonly guestRepository: GuestRepository) {}
  public static getInstance(
    guestRepository: GuestRepository
  ): GetAllGuestFiltered {
    if (!GetAllGuestFiltered.instance) {
      GetAllGuestFiltered.instance = new GetAllGuestFiltered(guestRepository)
    }
    return GetAllGuestFiltered.instance
  }
  async execute(query: string, currentPage: number, itemsPerPage: number = 10) {
    const offset = (currentPage - 1) * itemsPerPage
    const guests = await this.guestRepository.findAllGuestFiltered(
      query,
      itemsPerPage,
      offset
    )
    return Guest
  }
}
