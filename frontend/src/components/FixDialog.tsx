import { CalendarClock, ClipboardEdit } from "lucide-react"
import { Button } from "./ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { useFormState } from "react-dom"
import { fixGuest } from "@/lib/actions"

export default function FixDialog({
  id,
  name,
  entryDate,
  createdBy,
  status,
  plate,
  model,
  pax,
  apartment,
  observation,
  departureDate,
}: {
  id: string
  name: string
  entryDate: string
  createdBy: string
  status: string
  plate?: string
  model?: string
  pax?: number
  apartment?: number
  observation?: string
  departureDate?: string
}) {
  const [state, formAction] = useFormState(fixGuest, undefined)
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="space-x-1">
          <ClipboardEdit />
          <span>Corrigir</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form action={formAction}>
          <DialogHeader>
            <DialogTitle>Corrigir</DialogTitle>
            <DialogDescription>Corriga erros de digitação</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <input
              type="text"
              name="id"
              defaultValue={id}
              className="sr-only"
            />
            <input
              type="text"
              name="status"
              defaultValue={status}
              className="sr-only"
            />
            <input
              type="text"
              name="createdBy"
              defaultValue={createdBy}
              className="sr-only"
            />
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nome
              </Label>
              <Input
                id="name"
                type="text"
                name="name"
                defaultValue={name}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="plate" className="text-right">
                Placa
              </Label>
              <Input
                id="plate"
                type="text"
                name="plate"
                defaultValue={plate}
                className="col-span-3"
                onChange={(e) =>
                  (e.target.value = e.target.value.toUpperCase())
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="model" className="text-right">
                Modelo
              </Label>
              <Input
                id="model"
                type="text"
                name="model"
                defaultValue={model}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="pax" className="text-right">
                Passageiros
              </Label>
              <Input
                id="pax"
                name="pax"
                type="number"
                defaultValue={pax}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="apartment" className="text-right">
                Apartamento
              </Label>
              <Input
                id="apartment"
                name="apartment"
                type="number"
                defaultValue={apartment}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="observation" className="text-right">
                Observação
              </Label>
              <Input
                id="observation"
                name="observation"
                type="text"
                defaultValue={observation}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="entryDate" className="text-right">
                Data de Entrada
              </Label>
              <Input
                id="entryDate"
                name="entryDate"
                className="col-span-3"
                type="datetime-local"
                defaultValue={entryDate}
              />
            </div>
            {departureDate && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="departureDate" className="text-right">
                  Data de Saída
                </Label>
                <Input
                  id="departureDate"
                  name="departureDate"
                  className="col-span-3"
                  type="datetime-local"
                  defaultValue={departureDate}
                />
              </div>
            )}
          </div>
          <DialogFooter>
            {state?.message && (
              <>
                <span className="flex text-rose-700 text-xl">
                  {state?.message}
                </span>
              </>
            )}
            <Button type="submit">Salvar saída</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
