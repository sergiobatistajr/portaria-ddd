"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Card } from "./ui/card"

type DataProps = {
  month: string
  total: number
}[]

type GuestChartProps = {
  data: DataProps
}

export function GuestChart({ data }: GuestChartProps) {
  return (
    <Card>
      <ResponsiveContainer width="100%" height={650}>
        <BarChart data={data}>
          <XAxis
            dataKey="month"
            stroke="#000000"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#000000"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <Bar dataKey="total" fill="#adfa1d" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}
