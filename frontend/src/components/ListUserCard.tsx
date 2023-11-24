import UserCard from "./UserCard"

export default function ListUserCard({
  users,
}: {
  users: {
    name: string
    total: string
  }[]
}) {
  return (
    <>
      {users.map((user, index) => (
        <UserCard key={index} name={user.name} total={user.total} />
      ))}
    </>
  )
}
