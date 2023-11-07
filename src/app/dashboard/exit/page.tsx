import { fetchCountGuestsPages } from "@/lib/data"

import Pagination from "@/components/Pagination"
import { Suspense } from "react"
import ExitDateTable from "./ExitDataTable"
import Search from "@/components/Search"

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
  const totalPages = (await fetchCountGuestsPages(query)) ?? 1

  return (
    <main>
      <h1 className="flex justify-center text-3xl">Saídas</h1>
      <div className="mt-2 space-y-2">
        <Search placeholder="Procurar visitante..." />
        <Suspense key={query + currentPage} fallback={<h1>Carregando</h1>}>
          <ExitDateTable query={query} currentPage={currentPage} />
        </Suspense>
        <Pagination totalPages={totalPages} />
      </div>
    </main>
  )
}
