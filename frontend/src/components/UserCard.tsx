import { TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader } from "./ui/card"

export default function UserCard({
  name,
  total_guests,
}: {
  name: string
  total_guests: number
}) {
  return (
    <section className="hidden xl:block w-[150px]">
      <Card>
        <CardHeader>
          <p className="font-semibold text-2xl">{name.toUpperCase()}</p>
        </CardHeader>
        <CardContent className="flex space-x-2">
          <TrendingUp className="w-6 h-6" />
          <p>{total_guests}</p>
        </CardContent>
      </Card>
    </section>
  )
}
