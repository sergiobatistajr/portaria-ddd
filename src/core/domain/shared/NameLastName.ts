export default class NameLastName {
  constructor(readonly value: string) {
    if (!value) {
      throw new Error("Nome é obrigatório")
    }
    if (!value.split(" ")[1]) {
      throw new Error("Sobrenome é obrigatório")
    }
  }
}
