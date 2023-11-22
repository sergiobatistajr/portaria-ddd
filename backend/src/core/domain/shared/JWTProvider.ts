import jwt from "jsonwebtoken"

export default class JWTProvider {
  private static secretKey = "your-secret-key"
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
