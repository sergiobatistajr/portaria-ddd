"use client"

import Guest from "@/core/domain/entities/Guest"
import { ColumnDef } from "@tanstack/react-table"
type DTO = {
  nomeCompleto: string
  dataEntrada: string
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
]
