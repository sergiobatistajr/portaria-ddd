import Guest from "../../domain/entities/Guest"
import GuestRepository from "../repository/GuestRepository"

export default class RegisterGuestDeparture {
  constructor(readonly guestRepository: GuestRepository) {}

  async execute(input: Input): Promise<Output> {
    let status = "inside"
    const guest = await this.guestRepository.findByIdAndStatus(input.id, status)
    if (!guest) {
      throw new Error("Visitante não existe")
    }
    status = "finished"
    const updatedGuest = Guest.create(
      guest.name,
      guest.entryDate,
      guest.createdBy,
      guest.plate,
      guest.model,
      guest.pax,
      guest.apartment,
      guest.observation,
      status,
      input.departureDate,
      guest.id
    )
    await this.guestRepository.update(updatedGuest)
  }
}

type Input = {
  id: string
  departureDate: Date
}

type Output = void
