import { fetchAllGuestFiltered } from "@/lib/data"
import { columns } from "./Columns"
import { DataTable } from "@/components/DataTable"
import { formatDateToLocal } from "@/lib/utils"

export default async function AllGuestDataTable({
  query,
  currentPage,
}: {
  query: string
  currentPage: number
}) {
  const data = await fetchAllGuestFiltered(query, currentPage)
  const guests = data?.map((g) => {
    return {
      id: g.id,
      nomeCompleto: g.name,
      dataEntrada: formatDateToLocal(g.entryDate.toISOString()),
      dataSaida: g.departureDate
        ? formatDateToLocal(g.departureDate.toISOString())
        : "-",
      placa: g.plate ?? "-",
      modelo: g.model ?? "-",
      apartamento: g.apartment?.toString() ?? "-",
      observacao: g.observation ?? "-",
      passageiros: g.pax?.toString() ?? "-",
      entradaPor: g.createdBy,
    }
  })

  return (
    <div>
      <DataTable columns={columns} data={guests ?? []} />
    </div>
  )
}
