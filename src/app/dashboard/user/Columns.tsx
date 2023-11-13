"use client"

import { ColumnDef } from "@tanstack/react-table"
import UserActions from "./UserActions"
type DTO = {
  id: string
  nomeCompleto: string
  email: string
  ativo: string
  funcao: string
}

export const adminColumns: ColumnDef<DTO>[] = [
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
  {
    id: "actions",
    cell: ({ row }) => {
      const { id, nomeCompleto } = row.original
      return <UserActions id={id} name={nomeCompleto} />
    },
  },
]
export const userColumns: ColumnDef<DTO>[] = [
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
