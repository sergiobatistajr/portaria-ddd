import Email from "../shared/Email"
import Id from "../shared/Id"
import NameLastName from "../shared/NameLastName"
import UserRole from "../shared/UserRole"
import UserStatus from "../shared/UserStatus"

export default class User {
  private constructor(
    readonly id: string,
    readonly name: string,
    readonly email: string,
    readonly role: string,
    readonly status: string,
    readonly password: string
  ) {}

  static create(
    name: string,
    email: string,
    password: string,
    role: string,
    status: string,
    id?: string
  ) {
    const _id = id ? id : Id.generate()
    const _name = NameLastName.validade(name)
    const _email = Email.validade(email)
    const _password = password
    const _role = UserRole.validate(role)
    const _status = UserStatus.validade(status)
    return new User(_id, _name, _email, _role, _status, _password)
  }
}
