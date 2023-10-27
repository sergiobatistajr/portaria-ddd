export default class StrongPassword {
  static validate(value: string) {
    if (!value) {
      throw new Error("Senha é obrigatória")
    }
    if (value.length < 8) {
      throw new Error("Senha muito fraca")
    }
    return value
  }
}
