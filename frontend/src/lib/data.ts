"use server"
import { unstable_noStore as noStore } from "next/cache"

export async function fetchUserById(id: string) {
  noStore()
  try {
    const user = await findUserById.execute(id)
    return user
  } catch (error) {
    if (error instanceof Error) {
      return console.log(error.message)
    }
  }
}

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
