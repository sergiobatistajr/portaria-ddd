import express, { Request, Response } from "express"
import pgPromise, { IDatabase } from "pg-promise"
import UserRepositoryDatabase from "./core/infra/db/UserRepositoryDatabase"
import FindFilteredUsers from "./core/application/usecase/FindFilteredUsers"
import UserController from "./controllers/UserController"
import CountUsersPage from "./core/application/usecase/CountUsersPage"
import RegisterUser from "./core/application/usecase/RegisterUser"
import LoginUser from "./core/application/usecase/LoginUser"
import AuthController from "./controllers/AuthController"
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
//casos de uso
const findFilteredUsers = FindFilteredUsers.getInstance(userDb)
const countUsersPage = CountUsersPage.getInstance(userDb)
const registerUser = RegisterUser.getInstance(userDb)
const loginUser = LoginUser.getInstance(userDb)
//controllers
const userController = new UserController({
  findFilteredUsers,
  countUsersPage,
})
const authController = new AuthController({ loginUser, registerUser })

//express
const app = express()
app.use(express.json())

//rotas
app.post(
  "/auth/login",
  async (req: Request, res: Response) =>
    await authController.login({ req, res })
)
app.get(
  "/users",
  async (req: Request, res: Response) =>
    await userController.findFilteredUsers({ req, res })
)
app.get(
  "/users/count",
  async (req: Request, res: Response) =>
    await userController.countUsersPage({ req, res })
)

//server listen
app.listen(3001, () => {
  console.log("Aplicação está rodando na porta 3001")
})
