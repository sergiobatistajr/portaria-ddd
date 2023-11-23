import { Suspense } from "react"
import GenerateChart from "./GenerateChart"
import GuestChartSkeleton from "@/components/GuestChartSkeleton"
import { Card } from "@/components/ui/card"

export default async function Page() {
  return (
    <main className="flex">
      <div className="flex-1">
        <Suspense fallback={<GuestChartSkeleton />}>
          <GenerateChart />
        </Suspense>
      </div>
      <div className="flex-shrink w-1/8">
        <Card className="text-center">
          <h1>Joao Sérgio</h1>
          <p>300</p>
        </Card>
      </div>
    </main>
  )
}
