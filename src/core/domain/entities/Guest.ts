import Apartment from "../shared/Apartment"
import Id from "../shared/Id"
import NameLastName from "../shared/NameLastName"
import Plate from "../shared/Plate"

export default class Guest {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly entryDate: Date,
    readonly createdBy: string,
    readonly plate?: string,
    readonly model?: string,
    readonly pax?: number,
    readonly apartment?: number,
    readonly observation?: string,
    readonly departureDate?: Date,
    readonly status?: string
  ) {}

  static create(
    name: string,
    entryDate: Date,
    createdBy: string,
    plate?: string,
    model?: string,
    pax?: number,
    apartment?: number,
    observation?: string,
    departureDate?: Date,
    status?: string,
    id?: string
  ) {
    const _id = id ? id : Id.generate()
    const _name = NameLastName.validade(name)
    const _entryDate = new Date(entryDate)
    const _createdBy = createdBy
    const _plate = plate ? Plate.mercosul(plate) : undefined
    const _model = model ? model : undefined
    const _pax = pax ? pax : undefined
    const _apartment = apartment ? Apartment.validate(apartment) : undefined
    const _observation = observation ? observation : undefined
    const _departureDate = departureDate ? new Date(departureDate) : undefined
    const _status = status ? status : undefined
    return new Guest(
      _id,
      _name,
      _entryDate,
      _createdBy,
      _plate,
      _model,
      _pax,
      _apartment,
      _observation,
      _departureDate,
      _status
    )
  }
}
