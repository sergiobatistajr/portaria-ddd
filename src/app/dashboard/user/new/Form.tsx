"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { createUser } from "@/lib/actions"
import { useFormState } from "react-dom"

type Roles = { role: string; placeHolder: string }[]
const roles: Roles = [
  {
    role: "admin",
    placeHolder: "Administrador",
  },
  {
    role: "user",
    placeHolder: "Porteiro",
  },
  {
    role: "report",
    placeHolder: "Relatórios",
  },
]
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
      <Select name="role">
        <SelectTrigger>
          <SelectValue id="role" placeholder="Selecione a função" />
        </SelectTrigger>
        <SelectContent>
          {roles.map((r) => (
            <SelectItem key={r.role} value={r.role}>
              {r.placeHolder}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
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
        <>
          <span className="text-rose-700 text-xl flex">{state?.message}</span>
        </>
      )}
      <Button type="submit">Salvar</Button>
    </form>
  )
}
