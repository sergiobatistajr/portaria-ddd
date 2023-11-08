"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createUser } from "@/lib/actions"
export default function RegisterUserForm() {
  return (
    <form action={createUser} className="space-y-4">
      <label htmlFor="name">Nome completo</label>
      <Input id="name" name="name" type="text" placeholder="João da Silva" />
      <label htmlFor="email">Email</label>
      <Input
        id="email"
        name="email"
        type="email"
        placeholder="joao.silva@exemplo.com"
      />
      <label htmlFor="password">Senha</label>
      <Input
        id="password"
        name="password"
        type="password"
        placeholder="**********"
      />
      <Button type="submit">Salvar</Button>
    </form>
  )
}
