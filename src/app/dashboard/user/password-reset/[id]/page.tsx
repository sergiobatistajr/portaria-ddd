import ResetPasswordForm from "./Form"

export default function Page({
  params,
  searchParams,
}: {
  params: {
    id: string
  }
  searchParams?: {
    query?: string
  }
}) {
  const name = searchParams?.query || "Inválido"
  return (
    <main className="space-y-1">
      <h1 className="text-3xl">Resetar Senha</h1>
      <h2 className="text-2xl font-bold">{name}</h2>
      <ResetPasswordForm id={params.id} />
    </main>
  )
}
