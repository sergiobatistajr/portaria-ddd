"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UnlockKeyhole, UserCog, LucideIcon } from "lucide-react"
import Link from "next/link"
type Items = {
  title: string
  href: string
  icon: LucideIcon
}[]
export default function UserActions({ id }: { id: string }) {
  const items: Items = [
    {
      title: "Editar usuário",
      href: `user/edit/${id}`,
      icon: UserCog,
    },
    {
      title: "Resetar Senha",
      href: `user/password-reset/${id}`,
      icon: UnlockKeyhole,
    },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          ...
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Ações</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {items.map((i) => {
          const ItemIcon = i.icon
          return (
            <DropdownMenuItem key={i.href}>
              <Link href={i.href} className="flex space-x-1">
                <ItemIcon className="w-4" />
                <p>{i.title}</p>
              </Link>
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
