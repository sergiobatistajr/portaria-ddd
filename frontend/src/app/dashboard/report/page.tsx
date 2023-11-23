import { fetchCountAllGuestsFilteredPages } from "@/lib/data"
import Pagination from "@/components/Pagination"
import { Suspense } from "react"
import Search from "@/components/Search"
import SkeletonDataTable from "@/components/SkeletonDataTable"
import AllGuestDataTable from "./AllGuestDataTable"

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string
    page?: string
  }
}) {
  const query = searchParams?.query || ""
  const currentPage = Number(searchParams?.page) || 1
  const totalPages = (await fetchCountAllGuestsFilteredPages(query)) ?? 1

  return (
    <main>
      <h1 className="flex text-3xl">Todos registros de visitante</h1>
      <div className="mt-2 space-y-2">
        <Search placeholder="Procurar visitante..." />
        <Suspense key={query + currentPage} fallback={<SkeletonDataTable />}>
          <AllGuestDataTable query={query} currentPage={currentPage} />
        </Suspense>
        <Pagination totalPages={parseInt(totalPages)} />
      </div>
    </main>
  )
}
