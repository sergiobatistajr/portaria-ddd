import express from "express"
import pgPromise, { IDatabase } from "pg-promise"
import UserRepositoryDatabase from "./core/infra/db/UserRepositoryDatabase"
import LoginUser from "./core/application/usecase/LoginUser"
import LoginController from "./controllers/LoginController"
import RegisterUser from "./core/application/usecase/RegisterUser"
import RegisterUserController from "./controllers/RegisterController"
import AuthMiddleware from "./middleware"
import UpdateUser from "./core/application/usecase/UpdateUser"
import UpdateUserController from "./controllers/UpdateUserController"
import FindFilteredUsers from "./core/application/usecase/FindFilteredUsers"
import FindFilteredUserController from "./controllers/FindFilteredUserController"
import FindUserById from "./core/application/usecase/FindUserById"
import FindUserByIdController from "./controllers/FindUserByIdController"
import CountUsersPage from "./core/application/usecase/CountUsersPage"
import CountUsersPageController from "./controllers/CountUsersPageController"

let dbInstance: IDatabase<any>
export function getDbInstance() {
  if (!dbInstance) {
    const pgp = pgPromise()
    dbInstance = pgp(process.env.POSTGRES_URL!)
  }
  return dbInstance
}
//dbs
const userDb = UserRepositoryDatabase.getInstance(getDbInstance())

//express
const app = express()
app.use(express.json())

const loginUser = LoginUser.getInstance(userDb)
new LoginController(app, loginUser)
//midleware
const authMiddleware = new AuthMiddleware()
//protegidas
const registerUser = RegisterUser.getInstance(userDb)
new RegisterUserController(app, registerUser, authMiddleware)

const updateUser = UpdateUser.getInstance(userDb)
new UpdateUserController(app, updateUser, authMiddleware)

const findFilteredUsers = FindFilteredUsers.getInstance(userDb)
new FindFilteredUserController(app, findFilteredUsers, authMiddleware)

const countUsersPage = CountUsersPage.getInstance(userDb)
new CountUsersPageController(app, countUsersPage, authMiddleware)

const findUserById = FindUserById.getInstance(userDb)
new FindUserByIdController(app, findUserById, authMiddleware)

app.listen(3001, () => {
  console.log("Aplicação está rodando na porta 3001")
})
