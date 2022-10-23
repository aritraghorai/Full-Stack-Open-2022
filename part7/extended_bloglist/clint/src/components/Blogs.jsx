import React, { useRef } from 'react'
import Blog from './Blog'
import PropTypes from 'prop-types'
import { useBlogsQuery } from '../Redux/Api/blogApi'
import Togglable from './Togglable'
import AddBlogForm from './AddBlogForm'

const Blogs = () => {
  const { data: blogs, isLoading, isError } = useBlogsQuery()
  const ref = useRef()

  if (isLoading) {
    return <div>Loading</div>
  }
  if (isError) {
    return <div>Sueting Went Wrong</div>
  }
  return (
    <div>
      <h1 className="text-black text-2xl">Blogs</h1>
      <Togglable ref={ref} buttonLabel="create">
        <AddBlogForm />
      </Togglable>{' '}
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}
Blogs.prototype = {
  blogs: PropTypes.array.isRequired,
  updateBlog: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  deleteBlog: PropTypes.func.isRequired
}
export default Blogs
