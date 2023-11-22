import express, { Request, Response } from "express"
import pgPromise, { IDatabase } from "pg-promise"
import UserRepositoryDatabase from "./core/infra/db/UserRepositoryDatabase"
import FindFilteredUsers from "./core/application/usecase/FindFilteredUsers"
import UserController from "./controllers/UserController"
import CountUsersPage from "./core/application/usecase/CountUsersPage"
import RegisterUser from "./core/application/usecase/RegisterUser"
import LoginUser from "./core/application/usecase/LoginUser"
import AuthController from "./controllers/AuthController"
import authMiddleware from "./middleware"
import UpdateUser from "./core/application/usecase/UpdateUser"
import FindUserById from "./core/application/usecase/FindUserById"

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
const updateUser = UpdateUser.getInstance(userDb)
const findUserById = FindUserById.getInstance(userDb)
//controllers
const userController = new UserController({
  findFilteredUsers,
  countUsersPage,
  updateUser,
  findUserById,
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
app.post(
  "/auth/register",
  async (req: Request, res: Response) =>
    await authController.resgiter({ req, res })
)
//teste protegida
app.get(
  "/users",
  authMiddleware,
  async (req: Request, res: Response) =>
    await userController.findFilteredUsers({ req, res })
)
app.get(
  "/users/count",
  authMiddleware,
  async (req: Request, res: Response) =>
    await userController.countUsersPage({ req, res })
)
app.get(
  "/users/:id",
  authMiddleware,
  async (req: Request, res: Response) =>
    await userController.findUserById({ req, res })
)

app.patch(
  "/users/update/:id",
  authMiddleware,
  async (req: Request, res: Response) =>
    await userController.updateUser({ req, res })
)
//server listen
app.listen(3001, () => {
  console.log("Aplicação está rodando na porta 3001")
})
