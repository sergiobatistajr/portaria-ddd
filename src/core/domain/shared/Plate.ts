export default class Plate {
  static mercosul(plate: string) {
    const regex = /[A-Z]{3}[0-9][A-Z][0-9]{2}/g
    if (!regex.test(plate)) {
      throw new Error("Placa inválida")
    }
    return plate
  }
}
