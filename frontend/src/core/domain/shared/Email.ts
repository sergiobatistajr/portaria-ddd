export default class Email {
  static validade(email: string) {
    if (!email) {
      throw new Error("Email é obrigatório")
    }
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
    if (!regex.test(email)) {
      throw new Error("Email inválido")
    }
    return email
  }
}
