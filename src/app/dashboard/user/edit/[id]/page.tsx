import { fetchUserById } from "@/lib/data"
import UpdateUserForm from "./Form"
import { notFound } from "next/navigation"

export default async function Page({ params }: { params: { id: string } }) {
  const user = await fetchUserById(params.id)
  if (!user) {
    notFound()
  }
  return (
    <main className="space-y-2">
      <h1 className="text-3xl">Editar usuário</h1>
      <UpdateUserForm {...user} />
    </main>
  )
}
