import GuestRepository from "../repository/GuestRepository"

export default class VerifyUsersRegisters {
  private static instance: VerifyUsersRegisters
  private constructor(private readonly guestsRepository: GuestRepository) {}
  static getIntance(guestsRepository: GuestRepository) {
    if (!VerifyUsersRegisters.instance) {
      VerifyUsersRegisters.instance = new VerifyUsersRegisters(guestsRepository)
    }
    return VerifyUsersRegisters.instance
  }

  async execute(): Promise<Output> {
    return await this.guestsRepository.countAllGuestsByAllUsers()
  }
}
type Output = {
  name: string
  total: number
}[]
