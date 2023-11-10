export default class UserStatus {
  private static status = ["active", "deactivate"]

  static validade(value: string) {
    if (!this.status.includes(value)) {
      throw new Error("Status inválido")
    }
    return value
  }
}
