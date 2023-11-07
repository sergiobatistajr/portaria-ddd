import RegisterGuestEntry from "./RegisterGuestEntry"
import GuestRepositoryDatabase from "../../infra/db/GuestRepositoryDatabase"
import FindGuestInsideFiltered from "./FindGuestsInsideFiltered"

describe("RegisterGuestEntry", () => {
  const guestRepository = new GuestRepositoryDatabase()

  it("should register a new guest entry", async () => {
    const registerGuestEntry = new RegisterGuestEntry(guestRepository)

    const input = {
      name: "John Doe",
      entryDate: new Date(),
      createdBy: "e4cbcd1d-6e72-4e77-84ee-529a1c7e89c9",
      plate: "FLK5E66",
      model: "Tesla",
      pax: 2,
      apartment: 1,
      observation: "No observations",
    }

    await registerGuestEntry.execute(input)

    const guests = await new FindGuestInsideFiltered(guestRepository).execute(
      "",
      1
    )

    expect(guests).toHaveLength(1)

    const guest = guests[0]

    expect(guest.name).toBe(input.name)
    expect(guest.entryDate).toEqual(input.entryDate)
    expect(guest.createdBy).toBe(input.createdBy)
    expect(guest.plate).toBe(input.plate)
    expect(guest.model).toBe(input.model)
    expect(guest.pax).toBe(input.pax)
    expect(guest.apartment).toBe(input.apartment)
    expect(guest.observation).toBe(input.observation)
  })
})
