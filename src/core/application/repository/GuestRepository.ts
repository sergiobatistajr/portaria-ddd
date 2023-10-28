import Guest from "../../domain/entities/Guest"

export default interface GuestRepository {
  findByIdAndStatus(id: string, status: string): Promise<Guest | null>
  findByPlateAndStatus(plate: string, status: string): Promise<Guest | null>
  save(guest: Guest): Promise<void>
  update(guest: Guest): Promise<void>
}
