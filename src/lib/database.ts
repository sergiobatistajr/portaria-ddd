import pgp from "pg-promise"
import UserRepositoryDatabase from "@/core/infra/db/UserRepositoryDatabase"
import GuestRepositoryDatabase from "@/core/infra/db/GuestRepositoryDatabase"

// const db = pgp()("postgres://admin:admin@localhost:5432/app")
const db = pgp()(
  "postgres://default:z2lxO9AgmUWd@ep-weathered-disk-18232995-pooler.us-east-1.postgres.vercel-storage.com:5432/verceldb?sslmode=require"
)

export const guestDb = GuestRepositoryDatabase.getInstance(db)
export const userDb = UserRepositoryDatabase.getInstance(db)
