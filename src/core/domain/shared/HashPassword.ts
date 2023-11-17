import bcrypt from "bcryptjs"
export default class HashPassword {
  static hash(password: string) {
    const salt = bcrypt.genSaltSync(12)
    return bcrypt.hashSync(password, salt)
  }
  static verify(password: string, hash: string) {
    return bcrypt.compareSync(password, hash)
  }
}
