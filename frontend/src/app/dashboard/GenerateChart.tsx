import { GuestChart } from "@/components/GuestChart"
import { fetchGuestChart } from "@/lib/data"

export default async function GenerateChart() {
  const chart = await fetchGuestChart()
  return <GuestChart data={chart} />
}
