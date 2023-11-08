"use client"

import Guest from "@/core/domain/entities/Guest"
import { ColumnDef } from "@tanstack/react-table"
type DTO = {
  nomeCompleto: string
  email: string
  ativo: string
}

export const columns: ColumnDef<DTO>[] = [
  {
    accessorKey: "nomeCompleto",
    header: "Nome completo",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "ativo",
    header: "Ativo?",
  },
]
