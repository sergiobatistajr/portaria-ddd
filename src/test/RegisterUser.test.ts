import RegisterUser from "../core/application/usecase/RegisterUser"
import UserRepository from "../core/application/repository/UserRepository"
import User from "../core/domain/entities/User"

class MockUserRepository implements UserRepository {
  private users: User[] = []
  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email)
    return user || null
  }
  async save(user: User): Promise<void> {
    this.users.push(user)
  }
  async delete(id: string): Promise<void> {
    const index = this.users.findIndex((user) => user.id === id)
    this.users.splice(index, 1)
  }
}

describe("RegisterUser", () => {
  it("should register a new user", async () => {
    const userRepository = new MockUserRepository()
    const registerUser = new RegisterUser(userRepository)

    const input = {
      name: "John Doe",
      email: "johndoe@example.com",
      password: "password123",
    }

    await registerUser.execute(input)

    const user = await userRepository.findByEmail(input.email)

    expect(user).toBeDefined()
    expect(user?.name).toBe(input.name)
    expect(user?.email).toBe(input.email)
  })

  it("should throw an error if user already exists", async () => {
    const userRepository = new MockUserRepository()
    const registerUser = new RegisterUser(userRepository)

    const input = {
      name: "John Doe",
      email: "johndoe@example.com",
      password: "password123",
    }

    await userRepository.save(
      User.create(input.name, input.email, "hashedpassword")
    )

    await expect(registerUser.execute(input)).rejects.toThrow(
      "Usuário já existe"
    )
  })
})
