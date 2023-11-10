import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { saveExitGuest } from "@/lib/actions"
import { CalendarClock } from "lucide-react"
import { useFormState } from "react-dom"
const initialState = {
  message: "",
}
export default function DialogExitGuest({
  id,
  name,
  plate,
  entryDate,
}: {
  id: string
  name: string
  entryDate: string
  plate?: string
}) {
  const [state, formAction] = useFormState(saveExitGuest, initialState)
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="space-x-1">
          <CalendarClock />
          <span>Saída</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form action={formAction}>
          <DialogHeader>
            <DialogTitle>Lançar saída</DialogTitle>
            <DialogDescription>
              Tem certeza? Confira o nome e placa antes de lançar a saída.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <input
              type="text"
              name="id"
              defaultValue={id}
              className="sr-only"
            />
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nome
              </Label>
              <Input
                id="name"
                type="text"
                defaultValue={name}
                className="col-span-3"
                disabled
              />
            </div>
            {plate && plate !== "-" && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="plate" className="text-right">
                  Placa
                </Label>
                <Input
                  id="plate"
                  type="text"
                  defaultValue={plate}
                  className="col-span-3"
                  disabled
                />
              </div>
            )}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="entryDate" className="text-right">
                Data de Entrada
              </Label>
              <Input
                id="entryDate"
                name="entryDate"
                className="col-span-3"
                type="text"
                defaultValue={entryDate}
                disabled
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="departureDate" className="text-right">
                Data de Saída
              </Label>
              <Input
                id="departureDate"
                name="departureDate"
                className="col-span-3"
                type="datetime-local"
              />
            </div>
          </div>
          <DialogFooter>
            {state?.message && (
              <div>
                <span className="text-rose-700 text-xl">{state?.message}</span>
              </div>
            )}
            <Button type="submit">Salvar saída</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
