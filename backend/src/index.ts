import express, { Request, Response } from "express"
import pgPromise, { IDatabase } from "pg-promise"
import UserController from "./controllers/userController"
import FindFilteredUsers from "./core/application/usecase/FindFilteredUsers"
import UserRepositoryDatabase from "./core/infra/db/UserRepositoryDatabase"

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
const userController = UserController.getInstance(findFilteredUsers)
const app = express()

app.post("/users", async (req: Request, res: Response) => {
  return await userController.findFiltered(req, res)
})

app.listen(3001, () => {
  console.log("Aplicação está rodando na porta 3001")
})
