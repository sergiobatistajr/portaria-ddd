import { auth } from "@/auth"

export default async function Page() {
  const session = await auth()

  return (
    <div>
      teste
      {session?.user.id}
      {session?.user?.email}
      {session?.user?.name}
    </div>
  )
}
