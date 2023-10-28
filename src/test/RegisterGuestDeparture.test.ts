import RegisterGuestDeparture from "../core/application/usecase/RegisterGuestDeparture"
import GuestRepository from "../core/application/repository/GuestRepository"
import Guest from "../core/domain/entities/Guest"

class MockGuestRepository implements GuestRepository {
  private guests: Guest[] = []

  findByPlateAndStatus(plate: string, status: string): Promise<Guest | null> {
    throw new Error("Method not implemented.")
  }
  async findByIdAndStatus(id: string, status: string): Promise<Guest | null> {
    const guest = this.guests.find(
      (guest) => guest.id === id && guest.status === status
    )
    return guest || null
  }
  async save(guest: Guest): Promise<void> {
    this.guests.push(guest)
  }
  async update(guest: Guest): Promise<void> {
    const index = this.guests.findIndex((g) => g.id === guest.id)
    this.guests[index] = guest
  }
}

describe("RegisterGuestDeparture", () => {
  it("should register a guest departure", async () => {
    const guestRepository = new MockGuestRepository()
    const registerGuestDeparture = new RegisterGuestDeparture(guestRepository)

    const guest = Guest.create(
      "John Doe",
      new Date(),
      "Jane Doe",
      "FLK5E66",
      "sedan",
      2,
      1,
      "some observation",
      "inside",
      undefined,
      "123"
    )

    await guestRepository.save(guest)

    const input = {
      id: "123",
      departureDate: new Date(),
    }

    await registerGuestDeparture.execute(input)

    const updatedGuest = await guestRepository.findByIdAndStatus(
      input.id,
      "finished"
    )

    expect(updatedGuest).toBeDefined()
    expect(updatedGuest?.status).toBe("finished")
    expect(updatedGuest?.departureDate).toEqual(input.departureDate)
  })

  it("should throw an error if guest does not exist", async () => {
    const guestRepository = new MockGuestRepository()
    const registerGuestDeparture = new RegisterGuestDeparture(guestRepository)

    const input = {
      id: "123",
      departureDate: new Date(),
    }

    await expect(registerGuestDeparture.execute(input)).rejects.toThrow(
      "Visitante não existe"
    )
  })
})
