import DeleteUser from "./DeleteUser"
import UserRepository from "../repository/UserRepository"
import User from "../../domain/entities/User"

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

describe("DeleteUser", () => {
  it("should delete an existing user", async () => {
    const userRepository = new MockUserRepository()
    const deleteUser = new DeleteUser(userRepository)

    const input = {
      name: "John Doe",
      email: "johndoe@example.com",
      password: "password123",
    }

    const user = User.create(input.name, input.email, "hashedpassword")
    await userRepository.save(user)

    await deleteUser.execute(user.id)

    const deletedUser = await userRepository.findByEmail(input.email)

    expect(deletedUser).toBeNull()
  })

  it("should not throw an error if user does not exist", async () => {
    const userRepository = new MockUserRepository()
    const deleteUser = new DeleteUser(userRepository)

    const input = {
      name: "John Doe",
      email: "johndoe@example.com",
      password: "password123",
    }

    const user = User.create(input.name, input.email, "hashedpassword")

    await expect(deleteUser.execute(user.id)).resolves.not.toThrow()
  })
})
