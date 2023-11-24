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
    if (!input.id || !input.name || !input.entryDate || !input.createdBy) {
      throw new Error("Campos obrigatórios")
    }
    if (
      input.departureDate &&
      new Date(input.entryDate) > new Date(input.departureDate)
    ) {
      throw new Error("Data de saída não pode ser menor que a data de entrada!")
    }
    type FieldDependencies = { [key: string]: string[] }
    const fieldDependencies: FieldDependencies = {
      plate: ["model", "pax"],
      model: ["plate", "pax"],
      pax: ["plate", "model"],
    }
    function checkDependencies(
      input: any,
      fieldDependencies: FieldDependencies
    ) {
      let errors: Set<string> = new Set()
      const translate: { [key: string]: string } = {
        model: "modelo",
        plate: "placa",
        pax: "passageiros",
      }
      for (let key in fieldDependencies) {
        if (input[key]) {
          for (let value of fieldDependencies[key]) {
            if (!input[value]) {
              errors.add(
                `Se ${translate[key]} é fornecido, ${translate[value]} também deve ser fornecido.`
              )
            }
          }
        }
      }
      return Array.from(errors)
    }
    let errors = checkDependencies(input, fieldDependencies)
    if (errors.length > 0) {
      throw new Error(errors.join(" "))
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
