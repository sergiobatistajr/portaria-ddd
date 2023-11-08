import { auth } from "@/auth"

export default async function Page() {
  const session = await auth()

  return (
    <div className="min-h-screen">
      Home page
      {session?.user?.email}
      {session?.user?.name}
    </div>
  )
}
