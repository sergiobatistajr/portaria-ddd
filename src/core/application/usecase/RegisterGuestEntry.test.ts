import RegisterGuestEntry from "./RegisterGuestEntry"
import GuestRepository from "../repository/GuestRepository"
import Guest from "../../domain/entities/Guest"

class MockGuestRepository implements GuestRepository {
  update(guest: Guest): Promise<void> {
    throw new Error("Method not implemented.")
  }
  findByIdAndStatus(id: string, status: string): Promise<Guest | null> {
    throw new Error("Method not implemented.")
  }
  private guests: Guest[] = []
  async findByPlateAndStatus(
    plate: string,
    status: string
  ): Promise<Guest | null> {
    const guest =
      this.guests.find(
        (guest) => guest.plate === plate && guest.status === status
      ) ?? null
    return guest
  }
  async save(guest: Guest): Promise<void> {
    this.guests.push(guest)
  }
}

describe("RegisterGuestEntry", () => {
  it("should register a new guest entry", async () => {
    const guestRepository = new MockGuestRepository()
    const registerGuestEntry = new RegisterGuestEntry(guestRepository)

    const input = {
      name: "John Doe",
      entryDate: new Date(),
      createdBy: "Jane Smith",
      plate: "FLK5E66",
      model: "Honda Civic",
      pax: 2,
      apartment: 1,
      observation: "None",
    }

    await registerGuestEntry.execute(input)

    const guest = await guestRepository.findByPlateAndStatus(
      input.plate,
      "inside"
    )
    expect(guest).toBeDefined()
    expect(guest?.name).toBe(input.name)
    expect(guest?.entryDate).toEqual(input.entryDate)
    expect(guest?.createdBy).toBe(input.createdBy)
    expect(guest?.plate).toBe(input.plate)
    expect(guest?.model).toBe(input.model)
    expect(guest?.pax).toBe(input.pax)
    expect(guest?.apartment).toBe(input.apartment)
    expect(guest?.observation).toBe(input.observation)
    expect(guest?.status).toBe("inside")
  })

  it("should throw an error if guest is already inside", async () => {
    const guestRepository = new MockGuestRepository()
    const registerGuestEntry = new RegisterGuestEntry(guestRepository)

    const input = {
      name: "John Doe",
      entryDate: new Date(),
      createdBy: "Jane Smith",
      plate: "FLK5E66",
      model: "Honda Civic",
      pax: 2,
      apartment: 2,
      observation: "None",
    }

    await guestRepository.save(
      Guest.create(
        input.name,
        input.entryDate,
        input.createdBy,
        input.plate,
        input.model,
        input.pax,
        input.apartment,
        input.observation,
        "inside"
      )
    )

    await expect(registerGuestEntry.execute(input)).rejects.toThrow(
      "Visitante já está dentro"
    )
  })
})
