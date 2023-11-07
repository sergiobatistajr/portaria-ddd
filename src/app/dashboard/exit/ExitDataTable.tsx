import { fetchGuestFiltered } from "@/lib/data"
import { columns } from "./Columns"
import { DataTable } from "@/components/DataTable"

export default async function ExitDateTable({
  query,
  currentPage,
}: {
  query: string
  currentPage: number
}) {
  const data = await fetchGuestFiltered(query, currentPage)
  const guests = data?.map((g) => {
    return {
      id: g.id,
      nomeCompleto: g.name,
      dataEntrada: g.entryDate.toISOString().split("T")[0],
    }
  })

  return (
    <div>
      <DataTable columns={columns} data={guests ?? []} />
    </div>
  )
}
