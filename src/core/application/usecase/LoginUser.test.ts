import LoginUser from "./LoginUser"
import UserRepository from "../repository/UserRepository"
import User from "../../domain/entities/User"
import HashPassword from "../../domain/shared/HashPassword"

class MockUserRepository implements UserRepository {
  findFilteredUsers(query: string, currentPage: number): Promise<User[]> {
    throw new Error("Method not implemented.")
  }
  findUsersPage(query: string): Promise<number> {
    throw new Error("Method not implemented.")
  }
  private users: User[] = [
    User.create(
      "John Doe",
      "johndoe@example.com",
      HashPassword.hash("password123")
    ),
  ]
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

describe("LoginUser", () => {
  it("should login a user with valid credentials", async () => {
    const userRepository = new MockUserRepository()
    const loginUser = new LoginUser(userRepository)

    const input = {
      email: "johndoe@example.com",
      password: "password123",
    }

    const output = await loginUser.execute(input)

    expect(output).toEqual({
      id: expect.any(String),
      status: "logado",
    })
  })

  it("should throw an error if user is not registered", async () => {
    const userRepository = new MockUserRepository()
    const loginUser = new LoginUser(userRepository)

    const input = {
      email: "janedoe@example.com",
      password: "password123",
    }

    await expect(loginUser.execute(input)).rejects.toThrow(
      "Usuário não registrado"
    )
  })

  it("should throw an error if password is invalid", async () => {
    const userRepository = new MockUserRepository()
    const loginUser = new LoginUser(userRepository)

    const input = {
      email: "johndoe@example.com",
      password: "invalidpassword",
    }

    await expect(loginUser.execute(input)).rejects.toThrow("Senha inválida")
  })
})
