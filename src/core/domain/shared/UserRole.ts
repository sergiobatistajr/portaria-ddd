export default class UserRole {
  private static roles = ["admin", "user", "report"]
  public static validate(value: string) {
    if (!this.roles.includes(value)) {
      throw new Error("Função inválida")
    }
    return value
  }
}
