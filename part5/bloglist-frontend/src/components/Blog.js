import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog, userId, deleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [view, setView] = useState(false)
  const onClick = () => {
    setView(!view)
  }
  const addLikeHandler = () => {
    updateBlog(blog.id, {
      title: blog.title,
      url: blog.url,
      likes: blog.likes + 1,
      author: blog.author
    })
  }
  const deleteBlogHander = () => {
    deleteBlog(blog.id)
  }
  return (
    <div className="blog" style={blogStyle}>
      <div>
        <span className="title">{blog.title}</span>
        <span className="author">{blog.author}</span>
        {view ? (
          <button onClick={onClick}>hide</button>
        ) : (
          <button className="viewButton" onClick={onClick}>
            view
          </button>
        )}
      </div>
      {view && (
        <div className="blogDetail">
          <div className="url">{blog.url}</div>
          <div className="likes">
            likes {blog.likes}
            <button className="likesButton" onClick={addLikeHandler}>
              like
            </button>
          </div>
          <div className="username">{blog.user.name}</div>
          {blog.user.id === userId && (
            <div className="removeButton">
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
