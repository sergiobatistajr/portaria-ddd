"use client"
import { useTheme } from "next-themes"
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
  const theme = useTheme()
  const strokeColor = theme.theme === "light" ? "#000000" : "#FFFFFF"

  return (
    <>
      <Card className="hidden xl:block">
        <ResponsiveContainer width="100%" height={650}>
          <BarChart layout="horizontal" data={data}>
            <XAxis
              type="category"
              dataKey="month"
              stroke={strokeColor}
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              type="number"
              stroke={strokeColor}
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Bar dataKey="total" fill="#adfa1d" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
      <Card className="xl:hidden">
        <ResponsiveContainer width="100%" height={650}>
          <BarChart layout="vertical" data={data}>
            <YAxis
              type="category"
              dataKey="month"
              stroke={strokeColor}
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <XAxis
              type="number"
              stroke={strokeColor}
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Bar dataKey="total" fill="#adfa1d" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </>
  )
}
