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

export default function DialogExitGuest({
  id,
  name,
  plate,
}: {
  id: string
  name: string
  plate?: string
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="space-x-1">
          <CalendarClock />
          <span>Saída</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form action={saveExitGuest}>
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
            {plate && (
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
            <Button type="submit">Salvar saída</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}