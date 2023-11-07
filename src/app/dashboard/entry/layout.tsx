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
      <NavBarRow items={navItems} />
      <Separator className="my-2 w-2/6" />
      <div className="flex-1 lg:max-w-2xl">{children}</div>
    </div>
  )
}
