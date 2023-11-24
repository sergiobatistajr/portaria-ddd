import UserCard from "./UserCard"

export default function ListUserCard({
  users,
}: {
  users: {
    name: string
    total_guests: number
  }[]
}) {
  return (
    <>
      {users.map((user, index) => (
        <UserCard
          key={index}
          name={user.name}
          total_guests={user.total_guests}
        />
      ))}
    </>
  )
}
