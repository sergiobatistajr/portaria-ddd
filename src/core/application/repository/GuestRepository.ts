import Guest from "../../domain/entities/Guest"

export default interface GuestRepository {
  findById(id: string): Promise<Guest | null>
  findByNameAndStatusWithOutPlate(
    name: string,
    status: string
  ): Promise<Guest | null>
  findByPlateAndStatus(plate: string, status: string): Promise<Guest | null>
  findGuestsFilteredWStatus(
    query: string,
    status: string,
    itemsPerPage: number,
    offset: number
  ): Promise<Guest[]>
  countGuestsFilteredWStatusPage(query: string, status: string): Promise<number>
  findAllGuestFiltered(
    query: string,
    itemsPerPage: number,
    offset: number
  ): Promise<Guest[]>
  countAllGuestFilteredPage(query: string): Promise<number>
  save(guest: Guest): Promise<void>
  update(guest: Guest): Promise<void>
}
