"use server"
import FindFilteredUsers from "@/core/application/usecase/FindFilteredUsers"
import FindUsersPage from "@/core/application/usecase/CountUsersPage"
import UserRegisterRepositoryDatabase from "@/core/infra/db/UserRepositoryDatabase"
import { unstable_noStore as noStore } from "next/cache"
import GuestRepositoryDatabase from "@/core/infra/db/GuestRepositoryDatabase"
import FindGuestInsideFiltered from "@/core/application/usecase/FindGuestsInsideFiltered"
import CountGuestsInsidePage from "@/core/application/usecase/CountGuestsInsidePage"

export async function fetchGuestFiltered(query: string, currentPage: number) {
  noStore()
  try {
    const db = new GuestRepositoryDatabase()
    const guests = await new FindGuestInsideFiltered(db).execute(
      query,
      currentPage
    )
    await new Promise((resolve) => setTimeout(resolve, 2000))
    return guests
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)
    }
  }
}

export async function fetchCountGuestsPages(query: string) {
  noStore()
  try {
    const db = new GuestRepositoryDatabase()
    const totalPages = await new CountGuestsInsidePage(db).execute(query)
    return totalPages
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)
    }
  }
}

export async function fetchCountGuestsPage(query: string) {
  noStore()
  try {
    const db = new UserRegisterRepositoryDatabase()
    const totalPages = await new FindUsersPage(db).execute(query)
    return totalPages
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)
    }
  }
}

export async function fetchUsersFiltered(query: string, currentPage: number) {
  noStore()

  try {
    const db = new UserRegisterRepositoryDatabase()
    const users = await new FindFilteredUsers(db).execute(query, currentPage)
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
    const totalPages = await new FindUsersPage(db).execute(query)
    return totalPages
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)
    }
  }
}
