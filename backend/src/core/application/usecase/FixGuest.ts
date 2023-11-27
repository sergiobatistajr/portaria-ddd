import Guest from "../../domain/entities/Guest"
import GuestRepository from "../repository/GuestRepository"
class RequiredFieldError extends Error {
  constructor(field: string) {
    super(`Campo obrigatório: ${field}`)
    this.name = "RequiredFieldError"
  }
}

class InvalidDateError extends Error {
  constructor() {
    super("Data de saída não pode ser menor que a data de entrada!")
    this.name = "InvalidDateError"
  }
}

class FieldDependencyError extends Error {
  constructor(errors: string[]) {
    super(errors.join(" "))
    this.name = "FieldDependencyError"
  }
}
function checkRequiredFields(input: Input) {
  const requiredFields = ["id", "name", "entryDate", "createdBy"] as const
  for (let key of requiredFields) {
    if (!input[key]) {
      throw new RequiredFieldError(key)
    }
  }
}

function checkDate(input: Input) {
  if (
    input.departureDate &&
    new Date(input.entryDate) > new Date(input.departureDate)
  ) {
    throw new InvalidDateError()
  }
}
function checkDependencies(input: any) {
  const fieldDependencies = {
    plate: ["model", "pax"],
    model: ["plate", "pax"],
    pax: ["plate", "model"],
  }
  let errors: Set<string> = new Set()
  const translate = {
    model: "modelo",
    plate: "placa",
    pax: "passageiros",
  }
  for (let key in fieldDependencies) {
    if (input[key]) {
      for (let value of fieldDependencies[
        key as keyof typeof fieldDependencies
      ]) {
        if (!input[value]) {
          errors.add(
            `Se ${translate[key as keyof typeof translate]} é fornecido, ${
              translate[value as keyof typeof translate]
            } também deve ser fornecido.`
          )
        }
      }
    }
  }
  const aerros = Array.from(errors)
  if (aerros.length > 0) {
    throw new FieldDependencyError(aerros)
  }
}

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
    checkRequiredFields(input)
    checkDate(input)
    checkDependencies(input)
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
