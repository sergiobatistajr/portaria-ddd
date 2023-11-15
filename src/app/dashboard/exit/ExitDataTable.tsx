import { fetchGuestFilteredInside } from "@/lib/data"
import { columns } from "./Columns"
import { DataTable } from "@/components/DataTable"
import { formatDateToLocal } from "@/lib/utils"

export default async function ExitDateTable({
  query,
  currentPage,
}: {
  query: string
  currentPage: number
}) {
  const data = await fetchGuestFilteredInside(query, currentPage)
  const guests = data?.map((g) => {
    return {
      id: g.id,
      nomeCompleto: g.name,
      dataEntrada: formatDateToLocal(g.entryDate.toISOString()),
      placa: g.plate ?? "-",
      modelo: g.model ?? "-",
      apartamento: g.apartment?.toString() ?? "-",
    }
  })

  return <DataTable columns={columns} data={guests ?? []} />
}
