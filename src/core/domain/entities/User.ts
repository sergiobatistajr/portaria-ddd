import Email from "../shared/Email"
import Id from "../shared/Id"
import NameLastName from "../shared/NameLastName"

export default class User {
  private constructor(
    readonly id: string,
    readonly name: string,
    readonly email: string,
    readonly password: string
  ) {}

  static create(name: string, email: string, password: string, id?: string) {
    const _id = id ? id : Id.generate()
    const _name = NameLastName.validade(name)
    const _email = Email.validade(email)
    const _password = password
    return new User(_id, _name, _email, _password)
  }
}
