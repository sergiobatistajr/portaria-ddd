"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { resetPassword } from "@/lib/actions"
import { useFormState } from "react-dom"

export default function ResetPasswordForm({ id }: { id: string }) {
  const [state, action] = useFormState(resetPassword, undefined)

  return (
    <form action={action} className="space-y-4">
      <input name="id" type="text" defaultValue={id} className="sr-only" />
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
          <span className="text-rose-700 text-xl">{state?.message}</span>
        </>
      )}
      <Button type="submit">Salvar</Button>
    </form>
  )
}
