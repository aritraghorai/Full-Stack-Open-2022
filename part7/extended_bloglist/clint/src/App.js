import Blogs from './components/Blogs'
import LogInForm from './components/LogInForm'
import { useSelector } from 'react-redux'
import { getUserDetail } from './Redux/Reducers/userReducer'
import Navbar from './components/NavBar'
import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import Users from './components/Users'
import UserDetails from './components/UserDetailComponent'
import BlogDetail from './components/BlogDetail'

const App = () => {
  const user = useSelector(getUserDetail)

  if (!user.token) {
    return (
      <div>
        <LogInForm />
      </div>
    )
  }

  return (
    <div>
      <Navbar />
      <div className="mx-2 p-2 md:max-w-[1080px] md:mx-auto">
        <Routes>
          <Route path="/" element={<Blogs userId={user.user.id} />} />
          <Route path="users" element={<Users />} />
          <Route path="user/:id" element={<UserDetails />} />
          <Route path="blog/:id" element={<BlogDetail />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
