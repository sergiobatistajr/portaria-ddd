import { auth, signOut } from "@/auth"
import { PowerIcon } from "@heroicons/react/24/outline"
import { NavLinks } from "./NavLinks"
import { Button } from "./ui/button"

export async function SideNav() {
  const session = await auth()
  return (
    <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
      <NavLinks role={session?.user.role!} />
      <form
        action={async () => {
          "use server"
          await signOut()
        }}
      >
        <Button
          variant="ghost"
          className="flex h-[48px] grow items-center justify-center gap-2 rounded-m p-3 text-sm font-medium md:flex-none md:justify-start md:p-2 md:px-3"
        >
          <PowerIcon className="w-6" />
          <div className="hidden md:block">Sair</div>
        </Button>
      </form>
    </nav>
  )
}
