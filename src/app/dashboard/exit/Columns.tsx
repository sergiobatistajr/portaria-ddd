"use client"

import Guest from "@/core/domain/entities/Guest"
import { ColumnDef } from "@tanstack/react-table"
type DTO = {
  nomeCompleto: string
  dataEntrada: string
  placa: string
  modelo: string
  apartamento: string
  observacao: string
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
  {
    accessorKey: "observacao",
    header: "Observação?",
  },
]
