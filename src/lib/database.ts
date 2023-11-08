import pgp from "pg-promise"
import UserRepositoryDatabase from "@/core/infra/db/UserRepositoryDatabase"
import GuestRepositoryDatabase from "@/core/infra/db/GuestRepositoryDatabase"

const db = pgp()("postgres://admin:admin@localhost:5432/app")

export const guestDb = GuestRepositoryDatabase.getInstance(db)
export const userDb = UserRepositoryDatabase.getInstance(db)
