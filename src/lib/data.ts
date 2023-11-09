"use server"
import CountAllGuestFilteredPage from "@/core/application/usecase/CountAllGuestFilteredPage"
import CountGuestsInsideFilteredPage from "@/core/application/usecase/CountGuestsInsideFilteredPage"
import FindUsersPage from "@/core/application/usecase/CountUsersPage"
import FindAllGuestFiltered from "@/core/application/usecase/FindAllGuestFiltered"
import FindFilteredUsers from "@/core/application/usecase/FindFilteredUsers"
import FindGuestInsideFiltered from "@/core/application/usecase/FindGuestsInsideFiltered"
import { unstable_noStore as noStore } from "next/cache"
import { guestDb, userDb } from "./database"

const findGuestInsideFiltered = FindGuestInsideFiltered.getInstance(guestDb)
const countGuestsInsideFilteredPage =
  CountGuestsInsideFilteredPage.getInstance(guestDb)
const findAllGuestFiltered = FindAllGuestFiltered.getInstance(guestDb)
const countAllGuestFilteredPage = CountAllGuestFilteredPage.getInstance(guestDb)
const findFilteredUsers = FindFilteredUsers.getInstance(userDb)
const findUsersPage = FindUsersPage.getInstance(userDb)

export async function fetchAllGuestFiltered(
  query: string,
  currentPage: number
) {
  noStore()
  try {
    const guests = await findAllGuestFiltered.execute(query, currentPage)
    return guests
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)
    }
  }
}
export async function fetchCountAllGuestsFilteredPages(query: string) {
  noStore()
  try {
    const totalPages = await countAllGuestFilteredPage.execute(query)
    return totalPages
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)
    }
  }
}
export async function fetchGuestFilteredInside(
  query: string,
  currentPage: number
) {
  noStore()
  try {
    const guests = await findGuestInsideFiltered.execute(query, currentPage)
    return guests
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)
    }
  }
}

export async function fetchCountGuestsInsideFilteredPages(query: string) {
  noStore()
  try {
    const totalPages = await countGuestsInsideFilteredPage.execute(query)
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
    const users = await findFilteredUsers.execute(query, currentPage)
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
    const totalPages = await findUsersPage.execute(query)
    return totalPages
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)
    }
  }
}
