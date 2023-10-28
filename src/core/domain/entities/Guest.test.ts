import Guest from "./Guest"

describe("Guest", () => {
  it("should create a guest with valid data", () => {
    const guest = Guest.create(
      "John Doe",
      new Date(),
      "123",
      "FLK5E66",
      "Model X",
      2,
      1,
      "Observation",
      "status",
      new Date()
    )
    expect(guest).toBeInstanceOf(Guest)
    expect(guest.name).toBe("John Doe")
    expect(guest.entryDate).toBeInstanceOf(Date)
    expect(guest.createdBy).toBe("123")
    expect(guest.plate).toBe("FLK5E66")
    expect(guest.model).toBe("Model X")
    expect(guest.pax).toBe(2)
    expect(guest.apartment).toBe(1)
    expect(guest.observation).toBe("Observation")
    expect(guest.status).toBe("status")
    expect(guest.departureDate).toBeInstanceOf(Date)
  })

  it("should create a guest with a custom ID", () => {
    const guest = Guest.create(
      "John Doe",
      new Date(),
      "321",
      "FLK5E66",
      "Model X",
      2,
      1,
      "Observation",
      "status",
      new Date(),
      "custom-id"
    )
    expect(guest).toBeInstanceOf(Guest)
    expect(guest.id).toBe("custom-id")
    expect(guest.name).toBe("John Doe")
    expect(guest.entryDate).toBeInstanceOf(Date)
    expect(guest.createdBy).toBe("321")
    expect(guest.plate).toBe("FLK5E66")
    expect(guest.model).toBe("Model X")
    expect(guest.pax).toBe(2)
    expect(guest.apartment).toBe(1)
    expect(guest.observation).toBe("Observation")
    expect(guest.status).toBe("status")
    expect(guest.departureDate).toBeInstanceOf(Date)
  })

  it("should throw an error when creating a guest with invalid data", () => {
    expect(() => {
      Guest.create("", new Date(), "createdBy")
    }).toThrow("Nome é obrigatório")
    expect(() => {
      Guest.create(
        "John Doe",
        new Date(),
        "createdBy",
        "331231231231231",
        "Model X",
        2,
        1,
        "Observation",
        "status",
        new Date(),
        "invalid-id"
      )
    }).toThrow("Placa inválida")
    expect(() => {
      Guest.create(
        "John Doe",
        new Date(),
        "createdBy",
        "FLK5E66",
        "Model X",
        2,
        13123,
        "Observation",
        "status",
        new Date()
      )
    }).toThrow("Apartamento inválido")
  })
})
