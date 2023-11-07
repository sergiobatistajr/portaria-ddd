import Guest from "../../domain/entities/Guest"

export default interface GuestRepository {
  findByIdAndStatus(id: string, status: string): Promise<Guest | null>
  findByNameAndStatusWithOutPlate(
    name: string,
    status: string
  ): Promise<Guest | null>
  findByPlateAndStatus(plate: string, status: string): Promise<Guest | null>
  findGuestsFiltered(
    query: string,
    status: string,
    itemsPerPage: number,
    offset: number
  ): Promise<Guest[]>
  countGuestsPage(query: string, status: string): Promise<number>
  save(guest: Guest): Promise<void>
  update(guest: Guest): Promise<void>
}
