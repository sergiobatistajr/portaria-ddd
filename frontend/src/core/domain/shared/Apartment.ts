export default class Apartment {
  constructor(readonly apartmentList = [1, 2, 3]) {}
  static validate(apartment: number) {
    if (!new Apartment().apartmentList.includes(apartment)) {
      throw new Error("Apartamento inválido")
    }
    return apartment
  }
}
