"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import {
  UserPlus,
  UserMinus,
  Gauge,
  Cog,
  Table2,
  Wrench,
  type LucideIcon,
} from "lucide-react"
type NavLinksProps = {
  [key: string]: {
    title: string
    href: string
    icon: LucideIcon
  }[]
}
export function NavLinks({ role }: { role: string }) {
  const pathname = usePathname()
  const navLinks: NavLinksProps = {
    report: [
      {
        title: "Painel",
        href: "/dashboard",
        icon: Gauge,
      },
      {
        title: "Relatórios",
        href: "/dashboard/report",
        icon: Table2,
      },
    ],
    user: [
      {
        title: "Painel",
        href: "/dashboard",
        icon: Gauge,
      },
      {
        title: "Relatórios",
        href: "/dashboard/report",
        icon: Table2,
      },
      {
        title: "Entrada",
        href: "/dashboard/entry/vehicle",
        icon: UserPlus,
      },
      {
        title: "Saídas",
        href: "/dashboard/exit",
        icon: UserMinus,
      },
    ],
    admin: [
      {
        title: "Painel",
        href: "/dashboard",
        icon: Gauge,
      },
      {
        title: "Entrada",
        href: "/dashboard/entry/vehicle",
        icon: UserPlus,
      },
      {
        title: "Saídas",
        href: "/dashboard/exit",
        icon: UserMinus,
      },
      {
        title: "Relatórios",
        href: "/dashboard/report",
        icon: Table2,
      },
      {
        title: "Correção",
        href: "/dashboard/fix",
        icon: Wrench,
      },
      {
        title: "Usuários",
        href: "/dashboard/user",
        icon: Cog,
      },
    ],
  }
  const items = navLinks[role]
  return (
    <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
      {items.map((item) => {
        const ItemIcon = item.icon
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              pathname.split("/")[2] === item.href.split("/")[2]
                ? "bg-muted hover:bg-muted"
                : "hover:bg-transparent hover:underline",
              "justify-start space-x-2"
            )}
          >
            <ItemIcon className="w-6" />
            <p className="hidden md:block">{item.title}</p>
          </Link>
        )
      })}
    </nav>
  )
}
