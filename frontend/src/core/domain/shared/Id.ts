import { randomUUID } from "crypto"
export default class Id {
  static generate() {
    return randomUUID()
  }
}
