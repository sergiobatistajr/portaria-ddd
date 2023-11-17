"use server"
import { unstable_noStore as noStore } from "next/cache"
const api_url = `${process.env.EXPRESS_URL!}`
// export async function fetchUserById(id: string) {
//   noStore()
//   try {
//     const URL = `${api_url}/users/${id}`
//     const user = await fetch(URL)
//     return user.json()
//   } catch (error) {
//     if (error instanceof Error) {
//       return console.log(error.message)
//     }
//   }
// }

// export async function fetchAllGuestFiltered(
//   query: string,
//   currentPage: number
// ) {
//   noStore()
//   try {
//     const URL = `${api_url}/guests?search=${query}&page=${currentPage}`
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
    let URL = `${api_url}/users?query=${query}&currentPage=${currentPage}`
    const users = await fetch(URL)
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
    let URL = `${api_url}/users/count?query=${query}`
    const totalPages = await fetch(URL)
    return totalPages.json()
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)
    }
  }
}
