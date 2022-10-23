import { Link } from 'react-router-dom'
import { useGetAllTheUserQuery } from '../Redux/Api/userApi'

export default function Users() {
  const { data: users, isLoading, isError } = useGetAllTheUserQuery()

  if (isLoading) {
    return <div>Loading</div>
  }
  if (isError) {
    return <div>Something Went Wrong</div>
  }
  return (
    <div>
      <h1 className="text-2xl font-bold min-w-full">Users</h1>
      <div>
        <div className="flex gap-2 flex-col text-xl ">
          <div className="bg-gray-100 p-2 flex justify-between">
            <span className="title">User Name</span>
            <span className="author">Number Of Blogs</span>
          </div>

          {users.map((user) => {
            return (
              <Link
                className="cursor-pointer rounded "
                key={user.id}
                to={`/user/${user.id}`}
              >
                <div className="bg-gray-100 font-bold p-2 flex justify-between">
                  <span className="title">{user.name}</span>
                  <span className="author">{user.blogs.length}</span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
