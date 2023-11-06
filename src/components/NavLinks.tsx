"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export function NavLinks() {
  const pathname = usePathname()
  const items = [
    {
      title: "Painel",
      href: "/dashboard",
    },
    {
      title: "Entrada",
      href: "/dashboard/entry/vehicle",
    },
    {
      title: "Saída",
      href: "/dashboard/exit",
    },
    {
      title: "Notifications",
      href: "/dashboard/notifications",
    },
    {
      title: "Display",
      href: "/dashboard/display",
    },
  ]
  return (
    <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname.split("/")[2] === item.href.split("/")[2]
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start"
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  )
}
