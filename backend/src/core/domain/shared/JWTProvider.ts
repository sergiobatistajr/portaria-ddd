import jwt from "jsonwebtoken"

export default class JWTProvider {
  private static secretKey = process.env.JWT_SECHET!
  static sign(payload: object, expiresIn: string | number = "7d"): string {
    return jwt.sign(payload, this.secretKey, { expiresIn })
  }
  static verify(token: string) {
    try {
      return jwt.verify(token, this.secretKey)
    } catch (error) {
      throw new Error("Token inválido")
    }
  }
}
