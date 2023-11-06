import { ModeToggle } from "@/components/ModeToggle"
import { SideNav } from "@/components/SideNav"
import { Separator } from "@/components/ui/separator"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-6 min-h-screen p-10 pb-16 md:block">
      <div className="flex justify-between">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Painel</h2>
          <p className="text-muted-foreground">.</p>
        </div>
        <ModeToggle />
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/6">
          <SideNav />
        </aside>
        <div className="flex-1 lg:max-w-2xl">{children}</div>
      </div>
    </div>
  )
}
