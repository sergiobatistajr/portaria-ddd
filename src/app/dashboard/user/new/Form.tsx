"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createUser } from "@/lib/actions"
import { useFormState } from "react-dom"

export default function RegisterUserForm() {
  const [state, action] = useFormState(createUser, undefined)

  return (
    <form action={action} className="space-y-4">
      <Label htmlFor="name">Nome completo</Label>
      <Input
        id="name"
        name="name"
        type="text"
        placeholder="João da Silva"
        required
      />
      <Label htmlFor="email">Email</Label>
      <Input
        id="email"
        name="email"
        type="email"
        placeholder="joao.silva@exemplo.com"
        required
      />
      <Label htmlFor="role">Função</Label>
      <Input
        id="role"
        name="role"
        type="text"
        placeholder="Administrador"
        defaultValue={"admin"}
        required
      />
      <Label htmlFor="password">Senha</Label>
      <Input
        id="password"
        name="password"
        type="password"
        placeholder="**********"
        required
      />
      <Label htmlFor="confirmPassword">Cofirme a senha</Label>
      <Input
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        placeholder="**********"
        required
      />
      {state?.message && (
        <div>
          <span className="text-rose-700 text-xl">{state?.message}</span>
        </div>
      )}
      <Button type="submit">Salvar</Button>
    </form>
  )
}
