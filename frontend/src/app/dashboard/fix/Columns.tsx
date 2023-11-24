"use client"

import FixDialog from "@/components/FixDialog"
import { ColumnDef } from "@tanstack/react-table"
type DTO = {
  id: string
  nomeCompleto: string
  dataEntrada: string
  status: string
  dataSaida?: string
  placa?: string
  modelo?: string
  apartamento?: string
  observacao?: string
  entradaPor: string
  passageiros?: string
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
      const {
        id,
        nomeCompleto,
        placa,
        dataEntrada,
        entradaPor,
        status,
        apartamento,
        dataSaida,
        modelo,
        observacao,
        passageiros,
      } = row.original
      return (
        <FixDialog
          createdBy={entradaPor}
          entryDate={dataEntrada}
          id={id}
          name={nomeCompleto}
          status={status}
          apartment={apartamento ? parseInt(apartamento) : undefined}
          departureDate={dataSaida}
          key={id}
          model={modelo}
          observation={observacao}
          pax={passageiros ? parseInt(passageiros) : undefined}
          plate={placa}
        />
      )
    },
  },
]
