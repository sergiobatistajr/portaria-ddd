import express from "express"
import pgPromise, { IDatabase } from "pg-promise"
import UserRepositoryDatabase from "./core/infra/db/UserRepositoryDatabase"
import LoginUser from "./core/application/usecase/LoginUser"
import LoginController from "./controllers/LoginController"
import RegisterUser from "./core/application/usecase/RegisterUser"
import RegisterUserController from "./controllers/RegisterController"
import AuthMiddleware from "./middleware"

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

app.listen(3001, () => {
  console.log("Aplicação está rodando na porta 3001")
})
