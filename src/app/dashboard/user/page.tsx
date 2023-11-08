import Pagination from "@/components/Pagination"
import UsersDataTable from "./UsersDataTable"
import { fetchUsersPage } from "@/lib/data"
import Search from "@/components/Search"
import { Suspense } from "react"
import SkeletonDataTable from "@/components/SkeletonDataTable"

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
  const totalPages = (await fetchUsersPage(query)) || 1
  return (
    <main>
      <h1 className="flex text-3xl">Usuários</h1>
      <div className="mt-2 space-y-2">
        <Search placeholder="Buscar por usuários..." />
        <Suspense key={query + currentPage} fallback={<SkeletonDataTable />}>
          <UsersDataTable query={query} currentPage={currentPage} />
        </Suspense>
        <Pagination totalPages={totalPages} />
      </div>
    </main>
  )
}
