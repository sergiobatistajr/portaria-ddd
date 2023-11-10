"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { saveEntryGuest } from "@/lib/actions"
import { useFormState } from "react-dom"

export function GuestForm() {
  const [state, formAction] = useFormState(saveEntryGuest, undefined)
  return (
    <form action={formAction} className="space-y-4">
      <Label htmlFor="name">Nome completo</Label>
      <Input
        placeholder="João da Silva"
        id="name"
        name="name"
        type="text"
        required
      />
      <Label htmlFor="entryDate">Data de entrada</Label>
      <Input id="entryDate" name="entryDate" type="datetime-local" required />
      <Label htmlFor="observation">Obeservação?</Label>
      <Input
        id="observation"
        name="observation"
        type="text"
        placeholder="Evento, foi ao setor tal"
      />
      <Label htmlFor="apartment">Aparamento?</Label>
      <Input
        type="number"
        name="apartment"
        id="apartment"
        min={0}
        max={4000}
        placeholder="3010"
      />
      {state?.message && (
        <div>
          <span className="text-rose-700 text-xl">{state?.message}</span>
        </div>
      )}
      <Button type="submit">Salvar entrada</Button>
    </form>
  )
}
