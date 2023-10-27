import User from "../core/domain/entities/User"

describe("User", () => {
  it("should create a user with valid data", () => {
    const user = User.create("John Doe", "john.doe@example.com", "password")
    expect(user).toBeInstanceOf(User)
    expect(user.name).toBe("John Doe")
    expect(user.email).toBe("john.doe@example.com")
    expect(user.password).toBe("password")
  })
  it("should create a user with a custom ID", () => {
    const user = User.create(
      "John Doe",
      "john.doe@example.com",
      "password",
      "custom-id"
    )
    expect(user).toBeInstanceOf(User)
    expect(user.id).toBe("custom-id")
    expect(user.name).toBe("John Doe")
    expect(user.email).toBe("john.doe@example.com")
    expect(user.password).toBe("password")
  })

  it("should throw an error when creating a user with invalid data", () => {
    expect(() => {
      User.create("", "john.doe@example.com", "password")
    }).toThrow("Nome é obrigatório")
    expect(() => {
      User.create("jhon", "john.doe@example.com", "password")
    }).toThrow("Sobrenome é obrigatório")
    expect(() => {
      User.create("John Doe", "invalid-email", "password")
    }).toThrow("Email inválido")
  })
})
