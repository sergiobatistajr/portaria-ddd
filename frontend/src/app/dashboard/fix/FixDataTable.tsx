import { fetchAllGuestFiltered } from "@/lib/data"
import { columns } from "./Columns"
import { DataTable } from "@/components/DataTable"
import { formatDateToISO } from "@/lib/utils"

export default async function FixDataTable({
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
      createdBy: string
      entryDate: string
      status: string
      departureDate?: string
      plate?: string
      model?: string
      apartment?: number
      observation?: string
      pax?: number
      created_by_name: string
    }) => {
      return {
        id: g.id,
        nomeCompleto: g.name,
        dataEntrada: formatDateToISO(g.entryDate),
        dataSaida: g.departureDate
          ? formatDateToISO(g.departureDate)
          : undefined,
        placa: g.plate,
        modelo: g.model,
        apartamento: g.apartment?.toString(),
        observacao: g.observation,
        passageiros: g.pax?.toString(),
        status: g.status,
        entradaPor: g.createdBy,
      }
    }
  )

  return <DataTable columns={columns} data={guests ?? []} />
}
