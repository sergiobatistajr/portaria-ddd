"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { saveEntryVehicle as action } from "@/lib/actions"
export function VehicleForm() {
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
      <label htmlFor="plate">Placa do veiculo</label>
      <Input
        id="plate"
        type="text"
        name="plate"
        placeholder="ABC1D23"
        required
      />
      <label htmlFor="model">Modelo</label>
      <Input
        type="text"
        name="model"
        id="model"
        placeholder="Honda Fit, Gol e Uno"
        required
      />
      <label htmlFor="pax">Numero de passageiros</label>
      <Input type="number" name="pax" id="pax" defaultValue={1} required />
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
