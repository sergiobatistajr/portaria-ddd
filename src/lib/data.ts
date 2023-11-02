"use server"
import FindFilteredUsers from "@/core/application/usecase/FindFilteredUsers"
import FindUsersPage from "@/core/application/usecase/FindUsersPage"
import UserRegisterRepositoryDatabase from "@/core/infra/db/UserRepositoryDatabase"
import { unstable_noStore as noStore } from "next/cache"
const itemsPerPage = 1
export async function fetchUsersFiltered(query: string, currentPage: number) {
  noStore()

  try {
    const db = new UserRegisterRepositoryDatabase()
    const users = await new FindFilteredUsers(db).execute(
      query,
      currentPage,
      itemsPerPage
    )
    return users
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)
    }
  }
}

export async function fetchUsersPage(query: string) {
  noStore()
  try {
    const db = new UserRegisterRepositoryDatabase()
    const totalPages = await new FindUsersPage(db).execute(query, itemsPerPage)
    return totalPages
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)
    }
  }
}
