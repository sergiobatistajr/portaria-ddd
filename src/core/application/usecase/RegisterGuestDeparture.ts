import Guest from "../../domain/entities/Guest"
import GuestRepository from "../repository/GuestRepository"

export default class RegisterGuestDeparture {
  private static instance: RegisterGuestDeparture
  private constructor(readonly guestRepository: GuestRepository) {}
  public static getInstance(
    guestRepository: GuestRepository
  ): RegisterGuestDeparture {
    if (!RegisterGuestDeparture.instance) {
      RegisterGuestDeparture.instance = new RegisterGuestDeparture(
        guestRepository
      )
    }
    return RegisterGuestDeparture.instance
  }

  async execute(input: Input): Promise<Output> {
    let status = "inside"
    const guest = await this.guestRepository.findById(input.id)
    if (!guest) {
      throw new Error("Visitante não existe")
    }
    status = "finished"
    if (input.departureDate < guest.entryDate) {
      throw new Error("Data de saída não pode ser menor que a data de entrada!")
    }
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
