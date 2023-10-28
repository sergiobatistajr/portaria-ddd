import Guest from "../../domain/entities/Guest"
import GuestRepository from "../repository/GuestRepository"

export default class RegisterGuestEntry {
  constructor(readonly guestRepository: GuestRepository) {}

  async execute(input: Input): Promise<Output> {
    let guest
    const status = "inside"
    if (input.plate) {
      guest = await this.guestRepository.findByPlateAndStatus(
        input.plate,
        status
      )
    }
    if (guest) {
      throw new Error("Visitante já está dentro")
    }
    await this.guestRepository.save(
      Guest.create(
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
    )
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
