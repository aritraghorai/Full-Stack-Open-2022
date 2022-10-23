import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useRef } from 'react'
import {
  useDeleteBlogMutation,
  useGetBlogByIdQuery,
  useUpdateBlogsMutation
} from '../Redux/Api/blogApi'
import {
  useAddNewCommentMutation,
  useGetAllCommentsQuery
} from '../Redux/Api/commentApi'
import { getUserDetail } from '../Redux/Reducers/userReducer'

export default function BlogDetail() {
  const { id } = useParams()
  const contentRef = useRef()
  const user = useSelector(getUserDetail)
  //*For Add Like
  const [updateBlogById] = useUpdateBlogsMutation(id)
  //*For Delete A blog
  const [deleteBlogById] = useDeleteBlogMutation()
  //*For Get All Blogs
  const { data: blog, isLoading, isError } = useGetBlogByIdQuery({ id })
  //*For all blog related comment
  const { data: comments, isLoading: isCommentLoading } =
    useGetAllCommentsQuery({ id })
  //*For Add new Comment
  const [addnewCommentForBlog] = useAddNewCommentMutation()
  const navigate = useNavigate({ id })
  const addLikeHandler = () => {
    const newBlog = {
      title: blog.title,
      url: blog.url,
      likes: blog.likes + 1,
      author: blog.author
    }
    updateBlogById({ id: id, blog: newBlog })
  }
  const deleteBlogHander = () => {
    deleteBlogById(blog.id)
    navigate('/')
  }
  const addCommentHandler = () => {
    console.log(contentRef.current.value)
    addnewCommentForBlog({ id, content: contentRef.current.value })
  }
  if (isLoading || isCommentLoading) {
    return <div>Loading</div>
  }
  if (isError) {
    return <div>Someting Went Wrong</div>
  }
  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-2xl mt-2 font-bold">{blog.title}</h1>
      <a href={blog.url} className="hover:underline" target="_bank">
        {blog.url}
      </a>
      <div className="flex gap-3 items-center">
        <span>{blog.likes} likes</span>
        <button
          onClick={addLikeHandler}
          className="border-2 px-2 py-1 border-blue-500 rounded"
        >
          Like
        </button>
      </div>
      <div>Added By {blog.author}</div>
      {user.user.id === blog.user.id && (
        <button
          onClick={deleteBlogHander}
          className="border-2 px-2 py-1 border-blue-500 rounded w-fit"
        >
          Delete
        </button>
      )}
      <h2 className="text-2xl font-bold">Comments</h2>
      <div>
        <div className="author flex gap-3 my-1 items-center">
          <input
            className="border-2 border-black outline-none rounded p-1"
            type="comment"
            name="comment"
            id="comment"
            ref={contentRef}
          />
          <button
            className="border-2 px-2 py-1 border-blue-500 rounded w-fit"
            onClick={addCommentHandler}
          >
            Add Comment
          </button>
        </div>
      </div>
      <ul className="space-y-1 max-w-md list-disc list-inside text-black">
        {comments && comments.map((c) => <li key={c.id}>{c.content}</li>)}
      </ul>
    </div>
  )
}
