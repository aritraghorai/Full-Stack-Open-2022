import { useState, useEffect, useRef } from 'react'
import AddBlogForm from './components/AddBlogForm'
import Blogs from './components/Blogs'
import LogInForm from './components/LogInForm'
import {
  deleteBlogById,
  getAll,
  updateBlogbyId,
  addBlog
} from './services/blogs'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(undefined)
  const [message, setMessage] = useState({
    message: undefined,
    type: undefined
  })
  const ref = useRef()

  useEffect(() => {
    const getData = async () => {
      const res = await getAll()
      setBlogs(() => res)
      setBlogs((blogs) => blogs.sort((a, b) => b.likes - a.likes))
    }
    if (user) getData()
  }, [user])
  useEffect(() => {
    if (localStorage.getItem('user')) {
      setUser(JSON.parse(localStorage.getItem('user')))
    }
  }, [])

  const logoutHandler = () => {
    localStorage.removeItem('user')
    setUser(undefined)
  }
  const updateBlog = async (id, data) => {
    const res = await updateBlogbyId(id, data)
    setBlogs((blogs) => blogs.map((b) => (b.id === id ? res.data : b)))
    setBlogs((blogs) => blogs.sort((a, b) => b.likes - a.likes))
  }
  const deleteBlog = async (id) => {
    await deleteBlogById(id)
    setBlogs(blogs.filter((b) => b.id !== id))
  }
  const addBlogHandler = async (data) => {
    try {
      const res = await addBlog(data)
      ref.current.toggleVisibility()
      setBlogs((blogs) => [...blogs, res.data])
      setBlogs((blogs) => blogs.sort((a, b) => b.likes - a.likes))
      setMessage({
        message: `a new blog ${res.data.title} by ${res.data.author} added`,
        type: 'success'
      })
      setTimeout(() => {
        setMessage({ message: undefined, type: undefined })
      }, 5000)
    } catch (error) {
      setMessage({
        message: 'Invaid Token',
        type: 'error'
      })
      setTimeout(() => {
        setMessage({ message: undefined, type: undefined })
      }, 5000)
    }
  }

  if (user === undefined) {
    return (
      <div>
        <h1>log in to application</h1>
        <Notification message={message.message} type={message.type} />
        <LogInForm setUser={setUser} setMessage={setMessage} />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message.message} type={message.type} />
      <h3>
        {user.name} logged in
        <button type="submit" onClick={logoutHandler}>
          logout
        </button>
      </h3>
      <Togglable ref={ref} buttonLabel="create">
        <AddBlogForm addBlog={addBlogHandler} />
      </Togglable>
      <Blogs
        blogs={blogs}
        userId={user.id}
        updateBlog={updateBlog}
        deleteBlog={deleteBlog}
      />
    </div>
  )
}

export default App
