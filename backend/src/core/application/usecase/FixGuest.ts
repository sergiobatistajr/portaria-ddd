import Guest from "../../domain/entities/Guest"
import GuestRepository from "../repository/GuestRepository"

export default class FixGuest {
  private static instance: FixGuest
  private constructor(private readonly guestRepository: GuestRepository) {}
  static getInstance(guestRepository: GuestRepository) {
    if (!FixGuest.instance) {
      FixGuest.instance = new FixGuest(guestRepository)
    }
    return FixGuest.instance
  }
  async execute(input: Input): Promise<void> {
    if (input.id || !input.name || !input.entryDate || !input.createdBy) {
      throw new Error("Campos obrigatórios")
    }
    await this.guestRepository.update(
      Guest.create(
        input.name,
        input.entryDate,
        input.createdBy,
        input.plate,
        input.model,
        input.pax,
        input.apartment,
        input.observation,
        input.status,
        input.departureDate,
        input.id
      )
    )
  }
}
type Input = {
  id: string
  name: string
  entryDate: Date
  createdBy: string
  plate?: string
  model?: string
  pax?: number
  apartment?: number
  observation?: string
  departureDate?: Date
  status?: string
}
