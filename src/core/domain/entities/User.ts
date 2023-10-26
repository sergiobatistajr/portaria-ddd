import Email from "../shared/Email"
import Id from "../shared/Id"
import NameLastName from "../shared/NameLastName"
import StrongPassword from "../shared/StrongPassword"

export default class User {
  private constructor(
    readonly id: string,
    readonly name: string,
    readonly email: string,
    readonly password: string
  ) {}

  static create(name: string, email: string, password: string, id?: string) {
    const _id = id ? id : new Id().generate()
    const _name = new NameLastName(name).value
    const _email = new Email(email).value
    const _password = new StrongPassword(password).value
    return new User(_id, _name, _email, _password)
  }
}
