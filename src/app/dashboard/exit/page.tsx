import { fetchGuestFiltered } from "@/lib/data"

export default async function Page() {
  const guests = await fetchGuestFiltered("", 1)
  console.log(guests?.map((g) => g.name))
  return <main>Saidas</main>
}
