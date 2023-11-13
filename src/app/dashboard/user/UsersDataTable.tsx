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
    let status: "Ativo" | "Desativado" = "Desativado"
    let role: "Administrador" | "Porteiro" | "Relatório" = "Relatório"
    if (u.status === "active") status = "Ativo"
    if (u.status === "deactive") status = "Desativado"
    if (u.role === "admin") role = "Administrador"
    if (u.role === "user") role = "Porteiro"
    if (u.role === "report") role = "Relatório"
    return {
      nomeCompleto: u.name,
      ativo: status,
      email: u.email,
      funcao: role,
    }
  })

  return (
    <div>
      <DataTable columns={columns} data={users ?? []} />
    </div>
  )
}
