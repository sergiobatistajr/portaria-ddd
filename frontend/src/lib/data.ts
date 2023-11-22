"use server"
import { unstable_noStore as noStore } from "next/cache"
import { cookies } from "next/headers"
const URL = `${process.env.EXPRESS_URL}`
export async function fetchUserById(id: string) {
  noStore()
  try {
    const token = cookies().get("token")?.value
    let url = `${URL}/users/${id}`
    const user = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    return user.json()
  } catch (error) {
    if (error instanceof Error) {
      return console.log(error.message)
    }
  }
}

// export async function fetchAllGuestFiltered(
//   query: string,
//   currentPage: number
// ) {
//   noStore()
//   try {
//     const URL = `${URL}/guests?search=${query}&page=${currentPage}`
//     const guests = await fetch(URL)
//     return guests.json()
//   } catch (error) {
//     if (error instanceof Error) {
//       console.log(error.message)
//     }
//   }
// }
// export async function fetchCountAllGuestsFilteredPages(query: string) {
//   noStore()
//   try {
//     const URL = `${api_url}/guests?search=${query}`
//     const totalPages = await fetch(URL)
//     return totalPages.json()
//   } catch (error) {
//     if (error instanceof Error) {
//       console.log(error.message)
//     }
//   }
// }
// export async function fetchGuestFilteredInside(
//   query: string,
//   currentPage: number
// ) {
//   noStore()
//   try {
//     const guests = await findGuestInsideFiltered.execute(query, currentPage)
//     return guests
//   } catch (error) {
//     if (error instanceof Error) {
//       console.log(error.message)
//     }
//   }
// }

// export async function fetchCountGuestsInsideFilteredPages(query: string) {
//   noStore()
//   try {
//     const totalPages = await countGuestsInsideFilteredPage.execute(query)
//     return totalPages
//   } catch (error) {
//     if (error instanceof Error) {
//       console.log(error.message)
//     }
//   }
// }

export async function fetchUsersFiltered(query: string, currentPage: number) {
  noStore()
  try {
    const token = cookies().get("token")?.value
    let url = `${URL}/users?query=${query}&currentPage=${currentPage}`
    const users = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
    const token = cookies().get("token")?.value
    let url = `${URL}/users/count?query=${query}`
    const totalPages = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    return totalPages.json()
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)
    }
  }
}
