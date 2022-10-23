import { useState } from 'react'
import PropTypes from 'prop-types'
import {
  useDeleteBlogMutation,
  useUpdateBlogsMutation
} from '../Redux/Api/blogApi'

const Blog = ({ blog, userId }) => {
  const [updateBlogById] = useUpdateBlogsMutation()
  const [deleteBlogById] = useDeleteBlogMutation()

  const [view, setView] = useState(false)
  const onClick = () => {
    setView(!view)
  }
  const addLikeHandler = () => {
    const newBlog = {
      title: blog.title,
      url: blog.url,
      likes: blog.likes + 1,
      author: blog.author
    }
    console.log(newBlog)
    updateBlogById({ id: blog.id, blog: newBlog })
  }
  const deleteBlogHander = () => {
    deleteBlogById(blog.id)
  }
  return (
    <div className="blog my-3  bg-gray-100 p-3  rounded  mx-auto">
      <div className="flex gap-3 text-xl items-center">
        <span className="title">{blog.title}</span>
        <span className="author">{blog.author}</span>
        <button
          onClick={onClick}
          className="border-2 px-2 py-1 border-blue-500 rounded"
        >
          {view ? 'hide' : 'view'}
        </button>
      </div>
      {view && (
        <div className="blogDetail flex flex-col font-bold">
          <div className="url">{blog.url}</div>
          <div className="likes flex gap-2 items-center">
            <p>Likes {blog.likes}</p>
            <button
              className="likesButton border-2 px-2 py-1 border-blue-500 rounded"
              onClick={addLikeHandler}
            >
              like
            </button>
          </div>
          <div className="username">{blog.user.name}</div>
          {blog.user.id === userId && (
            <div className="removeButton border-2 px-2 py-1 border-blue-500 rounded w-fit">
              <button id="deleteBtn" onClick={deleteBlogHander}>
                remove
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

Blog.prototype = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  deleteBlog: PropTypes.func.isRequired
}
export default Blog
