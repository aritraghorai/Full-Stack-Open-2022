import React from 'react'
import Blog from './Blog'
import PropTypes from 'prop-types'

const Blogs = ({ blogs, updateBlog, userId, deleteBlog }) =>
  blogs.map((blog) => (
    <Blog
      key={blog.id}
      updateBlog={updateBlog}
      userId={userId}
      deleteBlog={deleteBlog}
      blog={blog}
    />
  ))

Blogs.prototype = {
  blogs: PropTypes.array.isRequired,
  updateBlog: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  deleteBlog: PropTypes.func.isRequired
}
export default Blogs
