import UserRegisterRepositoryDatabase from "../core/infra/db/UserRepositoryDatabase"
import RegisterUser from "../core/application/usecase/RegisterUser"
import LoginUser from "../core/application/usecase/LoginUser"
import DeleteUser from "../core/application/usecase/DeleteUser"

test("Deve criar, logar e deletar o usuario", async function () {
  const db = new UserRegisterRepositoryDatabase()
  const input = {
    name: "john doe",
    email: "teste@gmail.com",
    password: "12345678",
  }
  await new RegisterUser(db).execute(input)
  const login = await new LoginUser(db).execute({
    email: input.email,
    password: input.password,
  })
  expect(login.status).toBe("logado")
  const deleted = await new DeleteUser(db).execute(login.id)
  expect(deleted.status).toBe("deleted")
})
