"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { saveEntryVehicle } from "@/lib/actions"
import { useFormState } from "react-dom"

export function VehicleForm() {
  const [state, action] = useFormState(saveEntryVehicle, undefined)
  return (
    <form action={action} className="space-y-4">
      <Label htmlFor="name">Nome completo</Label>
      <Input
        placeholder="João da Silva"
        id="name"
        name="name"
        autoCapitalize="on"
        type="text"
        required
      />
      <Label htmlFor="entryDate">Data de entrada</Label>
      <Input id="entryDate" name="entryDate" type="datetime-local" required />
      <Label htmlFor="plate">Placa do veiculo</Label>
      <Input
        id="plate"
        type="text"
        name="plate"
        placeholder="ABC1D23"
        onChange={(e) => (e.target.value = e.target.value.toUpperCase())}
        required
      />
      <Label htmlFor="model">Modelo</Label>
      <Input
        type="text"
        name="model"
        id="model"
        placeholder="Honda Fit, Gol e Uno"
        required
      />
      <Label htmlFor="pax">Numero de passageiros</Label>
      <Input type="number" name="pax" id="pax" defaultValue={1} required />
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
      {state?.error ? (
        <div>
          <span className="text-rose-700 text-xl">{state?.message}</span>
        </div>
      ) : (
        <div>
          <span className="text-green-700 text-xl">{state?.message}</span>
        </div>
      )}
      <Button type="submit">Salvar entrada</Button>
    </form>
  )
}
