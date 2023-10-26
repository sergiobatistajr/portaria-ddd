import User from "../core/domain/entities/User"
import UserRegisterRepositoryDatabase from "../core/infra/db/UserRepositoryDatabase"
import RegisterUser from "../core/application/usecase/RegisterUser"
test("Deve instancear usuario corretamente", async function () {
  const db = new UserRegisterRepositoryDatabase()
  const registerInput = {
    name: "john doe",
    email: "teste@gmail.com",
    password: "12345678",
  }
  await new RegisterUser(db).execute(registerInput)
})
