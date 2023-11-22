import { fetchUsersFiltered } from "@/lib/data"
import { userColumns, adminColumns } from "./Columns"
import { DataTable } from "@/components/DataTable"
import { auth } from "@/auth"

export default async function UsersDataTable({
  query,
  currentPage,
}: {
  query: string
  currentPage: number
}) {
  const session = await auth()
  let columns = userColumns
  if (session?.user.role === "admin") columns = adminColumns
  const data = await fetchUsersFiltered(query, currentPage)
  const users = data?.map(
    (u: {
      status: string
      role: string
      id: string
      name: string
      email: string
    }) => {
      let status: "Ativo" | "Desativado" = "Desativado"
      let role: "Administrador" | "Porteiro" | "Relatório" = "Relatório"
      if (u.status === "active") status = "Ativo"
      if (u.status === "deactive") status = "Desativado"
      if (u.role === "admin") role = "Administrador"
      if (u.role === "user") role = "Porteiro"
      if (u.role === "report") role = "Relatório"
      return {
        id: u.id,
        nomeCompleto: u.name,
        ativo: status,
        email: u.email,
        funcao: role,
      }
    }
  )

  return <DataTable columns={columns} data={users ?? []} />
}
