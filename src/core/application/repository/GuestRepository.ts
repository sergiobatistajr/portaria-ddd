import Guest from "../../domain/entities/Guest"

export default interface GuestRepository {
  findByPlateAndStatus(plate: string, status: string): Promise<Guest | null>
  save(guest: Guest): Promise<void>
}
