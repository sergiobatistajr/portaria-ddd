import { Suspense } from "react"
import GenerateChart from "./GenerateChart"
import GuestChartSkeleton from "@/components/GuestChartSkeleton"
import ListUserCard from "@/components/ListUserCard"
const data = [
  {
    name: "Sérgio Batista",
    total: "12312312",
  },
]
export default async function Page() {
  return (
    <main className="flex">
      <div className="flex-1">
        <Suspense fallback={<GuestChartSkeleton />}>
          <GenerateChart />
        </Suspense>
      </div>
      <div className="flex-shrink w-1/7 max-h-[650px] overflow-auto">
        <ListUserCard users={data} />
      </div>
    </main>
  )
}
