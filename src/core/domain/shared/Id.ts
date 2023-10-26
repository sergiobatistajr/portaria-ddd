import { randomUUID } from "crypto"
export default class Id {
  generate() {
    return randomUUID()
  }
}
