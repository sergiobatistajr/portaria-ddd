import pgp, { IDatabase } from "pg-promise"
import UserRepositoryDatabase from "@/core/infra/db/UserRepositoryDatabase"
import GuestRepositoryDatabase from "@/core/infra/db/GuestRepositoryDatabase"

declare global {
  var db: IDatabase<any> | undefined
}

export const db = global.db || pgp()(process.env.POSTGRES_URL!)

if (process.env.NODE_ENV !== "production") global.db = db

export const guestDb = GuestRepositoryDatabase.getInstance(db)
export const userDb = UserRepositoryDatabase.getInstance(db)
