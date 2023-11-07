import { NavBarRow } from "@/components/NavBarRow"
import { Separator } from "@/components/ui/separator"

export default function Layout({ children }: { children: React.ReactNode }) {
  const navItems = [
    {
      title: "Veiculo",
      href: "/dashboard/entry/vehicle",
    },
    {
      title: "Passante",
      href: "/dashboard/entry/guest",
    },
  ]
  return (
    <div>
      <h1 className="flex text-3xl">Entrada</h1>
      <Separator className="mb-2 w-[115px]" />
      <NavBarRow items={navItems} />
      <div className="flex-1 lg:max-w-2xl mt-2">{children}</div>
    </div>
  )
}
