import User from "./User"

describe("User", () => {
  describe("create", () => {
    it("should create a user with valid parameters", () => {
      const user = User.create(
        "John Doe",
        "johndoe@example.com",
        "password",
        "admin",
        "active"
      )
      expect(user).toBeInstanceOf(User)
      expect(user.name).toBe("John Doe")
      expect(user.email).toBe("johndoe@example.com")
      expect(user.password).toBe("password")
      expect(user.role).toBe("admin")
      expect(user.status).toBe("active")
    })

    it("should throw an error for an invalid email", () => {
      expect(() =>
        User.create("John Doe", "invalidemail", "password", "admin", "active")
      ).toThrow("Email inválido")
    })

    it("should throw an error for an invalid name", () => {
      expect(() =>
        User.create("", "johndoe@example.com", "password", "admin", "active")
      ).toThrow("Nome é obrigatório")
    })

    it("should throw an error for an invalid role", () => {
      expect(() =>
        User.create(
          "John Doe",
          "johndoe@example.com",
          "password",
          "invalidrole",
          "active"
        )
      ).toThrow("Função inválida")
    })

    it("should throw an error for an invalid status", () => {
      expect(() =>
        User.create(
          "John Doe",
          "johndoe@example.com",
          "password",
          "admin",
          "invalidstatus"
        )
      ).toThrow("Status inválido")
    })
  })
})
