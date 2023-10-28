import UserRegisterRepositoryDatabase from "./UserRepositoryDatabase"
import User from "../../domain/entities/User"

describe("UserRepositoryDatabase", () => {
  const user = User.create("John Doe", "johndoe@example.com", "password")

  it("should save a user", async () => {
    const userRepository = new UserRegisterRepositoryDatabase()
    await userRepository.save(user)

    const savedUser = await userRepository.findByEmail(user.email)

    expect(savedUser).toBeDefined()
    expect(savedUser?.name).toBe(user.name)
    expect(savedUser?.email).toBe(user.email)
    expect(savedUser?.password).toBe(user.password)
    expect(savedUser?.id).toBe(user.id)

    await userRepository.delete(user.id)
  })

  it("should find a user by email", async () => {
    const userRepository = new UserRegisterRepositoryDatabase()
    await userRepository.save(user)

    const foundUser = await userRepository.findByEmail(user.email)

    expect(foundUser).toBeDefined()
    expect(foundUser?.name).toBe(user.name)
    expect(foundUser?.email).toBe(user.email)
    expect(foundUser?.password).toBe(user.password)
    expect(foundUser?.id).toBe(user.id)

    await userRepository.delete(user.id)
  })

  it("should delete a user", async () => {
    const userRepository = new UserRegisterRepositoryDatabase()
    await userRepository.save(user)

    await userRepository.delete(user.id)

    const deletedUser = await userRepository.findByEmail(user.email)

    expect(deletedUser).toBeNull()
  })
})
