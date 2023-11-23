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
  const guests = data?.map(
    (g: {
      id: string
      name: string
      entryDate: string
      departureDate: string
      plate: string
      model: string
      apartment: number
      observation: string
      pax: number
      created_by_name: string
    }) => {
      return {
        id: g.id,
        nomeCompleto: g.name,
        dataEntrada: formatDateToLocal(g.entryDate),
        dataSaida: g.departureDate ? formatDateToLocal(g.departureDate) : "-",
        placa: g.plate ?? "-",
        modelo: g.model ?? "-",
        apartamento: g.apartment?.toString() ?? "-",
        observacao: g.observation ?? "-",
        passageiros: g.pax?.toString() ?? "-",
        entradaPor: g.created_by_name,
      }
    }
  )

  return <DataTable columns={columns} data={guests ?? []} />
}
