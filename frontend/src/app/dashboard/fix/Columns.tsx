"use client"

import DialogExitGuest from "@/components/DialogExit"
import { ColumnDef } from "@tanstack/react-table"
type DTO = {
  id: string
  nomeCompleto: string
  dataEntrada: string
  dataSaida: string
  placa: string
  modelo: string
  apartamento: string
  observacao: string
  entradaPor: string
  passageiros: string
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
    accessorKey: "dataSaida",
    header: "Data de saída",
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
  {
    accessorKey: "observacao",
    header: "Observação",
  },
  {
    accessorKey: "passageiros",
    header: "Passgeiros",
  },
  {
    id: "actions",
    header: "Corrigir",
    cell: ({ row }) => {
      const { id, nomeCompleto, placa, dataEntrada } = row.original
      return <button>...</button>
    },
  },
]
