import { useParams } from 'react-router-dom'
import { useGetUserDetailByIdQuery } from '../Redux/Api/userApi'

export default function UserDetails() {
  const { id } = useParams()
  const { data: user, isLoading, isError } = useGetUserDetailByIdQuery({ id })
  if (isLoading) {
    return <div>Loading</div>
  }
  if (isError || !user) {
    return <div>Invalid User</div>
  }
  return (
    <div>
      <h1 className="text-2xl font-bold">{user.name}</h1>
      <h2 className="text-xl font-bold mt-5">Added Blogs</h2>
      <div className="flex flex-col gap-4 mt-5">
        {user.blogs.map((blog) => {
          return (
            <div
              className="bg-gray-100 font-bold p-2 flex items-center gap-4"
              key={blog.id}
            >
              <span className="author">{blog.title}</span>
              <span className="title">{blog.author}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
