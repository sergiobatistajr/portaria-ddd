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
import ResetPasswordController from "./controllers/ResetPasswordController"
import ResetPassword from "./core/application/usecase/ResetPassword"
import RegisterGuestEntry from "./core/application/usecase/RegisterGuestEntry"
import GuestRepositoryDatabase from "./core/infra/db/GuestRepositoryDatabase"
import RegisterGuestEntryController from "./controllers/RegisterGuestEntry"

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
const guestDb = GuestRepositoryDatabase.getInstance(getDbInstance())
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

const findFilteredUsers = FindFilteredUsers.getInstance(userDb)
new FindFilteredUserController(app, findFilteredUsers, authMiddleware)

const countUsersPage = CountUsersPage.getInstance(userDb)
new CountUsersPageController(app, countUsersPage, authMiddleware)

const findUserById = FindUserById.getInstance(userDb)
new FindUserByIdController(app, findUserById, authMiddleware)

const updateUser = UpdateUser.getInstance(userDb)
new UpdateUserController(app, updateUser, authMiddleware)

const resetPasswordUser = ResetPassword.getInstance(userDb)
new ResetPasswordController(app, resetPasswordUser, authMiddleware)

const registerGuestEntry = RegisterGuestEntry.getInstance(guestDb)
new RegisterGuestEntryController(app, registerGuestEntry, authMiddleware)

app.listen(3001, () => {
  console.log("Aplicação está rodando na porta 3001")
})
