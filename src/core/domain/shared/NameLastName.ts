export default class NameLastName {
  static validade(nameLastName: string) {
    if (!nameLastName) {
      throw new Error("Nome é obrigatório")
    }
    if (!nameLastName.split(" ")[1]) {
      throw new Error("Sobrenome é obrigatório")
    }
    return nameLastName
  }
}
