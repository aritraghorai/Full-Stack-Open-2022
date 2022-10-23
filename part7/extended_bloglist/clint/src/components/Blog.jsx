import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

const Blog = ({ blog }) => {
  const navigate = useNavigate()
  const onClick = () => {
    navigate(`/blog/${blog.id}`)
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
          View
        </button>
      </div>
    </div>
  )
}

Blog.prototype = {
  blog: PropTypes.object.isRequired
}
export default Blog
