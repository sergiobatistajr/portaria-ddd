import Guest from "../../domain/entities/Guest"
import GuestRepository from "../repository/GuestRepository"

export default class RegisterGuestEntry {
  constructor(readonly guestRepository: GuestRepository) {}

  async execute(input: Input): Promise<Output> {
    const status = "inside"
    if (input?.plate) {
      const guestVehicle = await this.guestRepository.findByPlateAndStatus(
        input?.plate,
        status
      )
      if (guestVehicle) {
        throw new Error("Veículo já está dentro")
      }
    }
    const guest = await this.guestRepository.findByNameAndStatusWithOutPlate(
      input.name,
      status
    )
    if (guest) {
      throw new Error("Visitante já está dentro")
    }
    const newGuest = Guest.create(
      input.name,
      input.entryDate,
      input.createdBy,
      input.plate,
      input.model,
      input.pax,
      input.apartment,
      input.observation,
      status
    )
    await this.guestRepository.save(newGuest)
  }
}

type Input = {
  name: string
  entryDate: Date
  createdBy: string
  plate?: string
  model?: string
  pax?: number
  apartment?: number
  observation?: string
}

type Output = void
