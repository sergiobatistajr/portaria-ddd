import { fetchUsersFiltered } from "@/lib/data"
import { columns } from "./Columns"
import { DataTable } from "@/components/DataTable"

export default async function UsersDataTable({
  query,
  currentPage,
}: {
  query: string
  currentPage: number
}) {
  const data = await fetchUsersFiltered(query, currentPage)
  const users = data?.map((u) => {
    return {
      nomeCompleto: u.name,
      email: u.email,
      ativo: u.status,
      funcao: u.role,
    }
  })

  return (
    <div>
      <DataTable columns={columns} data={users ?? []} />
    </div>
  )
}
