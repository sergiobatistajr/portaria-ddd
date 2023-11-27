"use server"
import { unstable_noStore as noStore } from "next/cache"
const URL = `${process.env.EXPRESS_URL}`
import { auth } from "@/auth"

export async function fetchListUserCard() {
  noStore()
  try {
    const session = await auth()
    const url = `${URL}/verify-registers`
    const users = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user.token}`,
      },
    })
    return users.json()
  } catch (error) {
    if (error instanceof Error) {
      return console.log(error.message)
    }
  }
}

export async function fetchGuestChart() {
  noStore()
  try {
    const session = await auth()
    const url = `${URL}/guests/chart`
    const chart = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user.token}`,
      },
    })
    return chart.json()
  } catch (error) {
    if (error instanceof Error) {
      return console.log(error.message)
    }
  }
}
export async function fetchUserById(id: string) {
  noStore()
  try {
    const session = await auth()
    const url = `${URL}/users/${id}`
    const user = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user.token}`,
      },
    })
    return user.json()
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
    const session = await auth()
    const url = `${URL}/guests-all?query=${query}&currentPage=${currentPage}`
    const guests = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user.token}`,
      },
    })
    return guests.json()
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)
    }
  }
}
export async function fetchCountAllGuestsFilteredPages(query: string) {
  noStore()
  try {
    const session = await auth()
    const url = `${URL}/guests-all/count?query=${query}`
    const totalPages = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user.token}`,
      },
    })
    return totalPages.json()
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
    const session = await auth()
    const url = `${URL}/guests-inside?query=${query}&currentPage=${currentPage}`
    const guestsInside = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user.token}`,
      },
    })
    return guestsInside.json()
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)
    }
  }
}

export async function fetchCountGuestsInsideFilteredPages(query: string) {
  noStore()
  try {
    const session = await auth()
    const url = `${URL}/guests-inside/count?query=${query}`
    const totalPages = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user.token}`,
      },
    })
    return totalPages.json()
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)
    }
  }
}

export async function fetchUsersFiltered(query: string, currentPage: number) {
  noStore()
  try {
    const session = await auth()
    const url = `${URL}/users?query=${query}&currentPage=${currentPage}`
    const users = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user.token}`,
      },
    })
    return users.json()
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)
    }
  }
}

export async function fetchUsersPage(query: string) {
  noStore()
  try {
    const session = await auth()
    const url = `${URL}/users/count?query=${query}`
    const totalPages = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user.token}`,
      },
    })
    return totalPages.json()
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)
    }
  }
}
