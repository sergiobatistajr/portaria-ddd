"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { saveEntryGuest as action } from "@/lib/actions"
export function GuestForm() {
  return (
    <form action={action} className="space-y-4">
      <label htmlFor="name">Nome completo</label>
      <Input
        placeholder="João da Silva"
        id="name"
        name="name"
        autoCapitalize="on"
        type="text"
        required
      />
      <label htmlFor="entryDate">Data de entrada</label>
      <Input id="entryDate" name="entryDate" type="datetime-local" required />
      <label htmlFor="observation">Obeservação?</label>
      <Input
        id="observation"
        name="observation"
        type="text"
        placeholder="Evento, foi ao setor tal"
      />
      <label htmlFor="apartment">Aparamento?</label>
      <Input
        type="number"
        name="apartment"
        id="apartment"
        min={0}
        max={4000}
        placeholder="3010"
      />
      <Button type="submit">Salvar entrada</Button>
    </form>
  )
}
