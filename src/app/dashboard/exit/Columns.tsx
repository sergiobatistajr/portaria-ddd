"use client"

import DialogExitGuest from "@/components/DialogExit"
import { ColumnDef } from "@tanstack/react-table"
type DTO = {
  id: string
  nomeCompleto: string
  dataEntrada: string
  placa: string
  modelo: string
  apartamento: string
}

export const columns: ColumnDef<DTO>[] = [
  {
    accessorKey: "nomeCompleto",
    header: "Nome completo",
  },
  {
    accessorKey: "dataEntrada",
    header: "Data de entrada",
  },
  {
    accessorKey: "placa",
    header: "Placa?",
  },
  {
    accessorKey: "modelo",
    header: "Modelo?",
  },
  {
    accessorKey: "apartamento",
    header: "Apartamento",
  },
]
