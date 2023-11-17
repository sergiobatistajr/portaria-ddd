import express, { Request, Response } from "express"
import pgPromise, { IDatabase } from "pg-promise"
import UserRepositoryDatabase from "./core/infra/db/UserRepositoryDatabase"
import FindFilteredUsers from "./core/application/usecase/FindFilteredUsers"
import UserController from "./controllers/UserController"
import CountUsersPage from "./core/application/usecase/CountUsersPage"
let dbInstance: IDatabase<any>
export function getDbInstance() {
  if (!dbInstance) {
    const pgp = pgPromise()
    dbInstance = pgp(process.env.POSTGRES_URL!)
  }
  return dbInstance
}
const userDb = UserRepositoryDatabase.getInstance(getDbInstance())
const findFilteredUsers = FindFilteredUsers.getInstance(userDb)
const countUsersPage = CountUsersPage.getInstance(userDb)
const userController = new UserController(findFilteredUsers, countUsersPage)
const app = express()
app.use(express.json())
app.get(
  "/users",
  async (req: Request, res: Response) =>
    await userController.findFilteredUsers(req, res)
)
app.get(
  "/users/count",
  async (req: Request, res: Response) =>
    await userController.countUsersPage(req, res)
)
app.listen(3001, () => {
  console.log("Aplicação está rodando na porta 3001")
})
