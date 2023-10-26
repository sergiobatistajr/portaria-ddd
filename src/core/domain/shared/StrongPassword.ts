export default class StrongPassword {
  constructor(readonly value: string) {
    if (!value) {
      throw new Error("Senha é obrigatória")
    }
    if (value.length < 8) {
      throw new Error("Senha muito fraca")
    }
  }
}
