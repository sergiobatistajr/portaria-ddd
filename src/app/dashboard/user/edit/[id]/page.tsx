export default async function ({ params }: { params: { id: string } }) {
  return <main>{params.id}</main>
}
