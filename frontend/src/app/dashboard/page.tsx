import { Suspense } from "react"
import GenerateChart from "./GenerateChart"
import GuestChartSkeleton from "@/components/GuestChartSkeleton"
import ListUserCard from "@/components/ListUserCard"
import { fetchListUserCard } from "@/lib/data"

export default async function Page() {
  const users = await fetchListUserCard()
  return (
    <main className="flex">
      <div className="flex-1">
        <Suspense fallback={<GuestChartSkeleton />}>
          <GenerateChart />
        </Suspense>
      </div>
      <div className="flex-shrink w-1/7 max-h-[650px] overflow-auto">
        <ListUserCard users={users} />
      </div>
    </main>
  )
}
