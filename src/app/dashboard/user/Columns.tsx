"use client"

import { ColumnDef } from "@tanstack/react-table"
type DTO = {
  nomeCompleto: string
  email: string
  ativo: string
  funcao: string
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
    accessorKey: "funcao",
    header: "Função",
  },

  {
    accessorKey: "ativo",
    header: "Ativo?",
  },
]
