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
import { updateUser } from "@/lib/actions"
import { useFormState } from "react-dom"

type SelectRoles = { role: string; placeHolder: string }[]
const selectRoles: SelectRoles = [
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
type SelectStatus = {
  status: string
  placeHolder: string
}[]
const selectStatus: SelectStatus = [
  {
    status: "active",
    placeHolder: "Ativo",
  },
  {
    status: "deactivate",
    placeHolder: "Desativado",
  },
]
export default function UpdateUserForm({
  id,
  email,
  name,
  role,
  status,
}: {
  id: string
  name: string
  email: string
  role: string
  status: string
}) {
  const [state, action] = useFormState(updateUser, undefined)

  return (
    <form action={action} className="space-y-4">
      <input name="id" className="sr-only" type="text" defaultValue={id} />
      <Label htmlFor="name">Nome completo</Label>
      <Input id="name" name="name" type="text" defaultValue={name} required />
      <Label htmlFor="email">Email</Label>
      <Input
        id="email"
        name="email"
        type="email"
        defaultValue={email}
        required
      />
      <Label htmlFor="role">Função</Label>
      <Select name="role" defaultValue={role}>
        <SelectTrigger>
          <SelectValue id="role" />
        </SelectTrigger>
        <SelectContent>
          {selectRoles.map((r) => (
            <SelectItem key={r.role} value={r.role}>
              {r.placeHolder}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Label htmlFor="status">Status</Label>
      <Select name="status" defaultValue={status}>
        <SelectTrigger>
          <SelectValue id="status" />
        </SelectTrigger>
        <SelectContent>
          {selectStatus.map((s) => (
            <SelectItem key={s.status} value={s.status}>
              {s.placeHolder}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {state?.message && (
        <div>
          <span className="text-rose-700 text-xl">{state?.message}</span>
        </div>
      )}
      <Button type="submit">Atualizar</Button>
    </form>
  )
}
