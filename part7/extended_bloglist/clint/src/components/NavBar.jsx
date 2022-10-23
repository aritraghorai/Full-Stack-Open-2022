import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getUserDetail, logoutCurrentUser } from '../Redux/Reducers/userReducer'

export default function Navbar() {
  const user = useSelector(getUserDetail)
  const dispatch = useDispatch()
  const logoutHandler = () => {
    localStorage.removeItem('user')
    dispatch(logoutCurrentUser())
  }

  return (
    <div className="bg-red-200 ">
      <div className="mx-2 md:max-w-[1080px] md:mx-auto">
        <nav className="flex justify-between p-2 items-center">
          <div className="frist flex gap-3">
            <Link to="/" className="blogs">
              Blogs
            </Link>
            <Link to="/users" className="blogs">
              Users
            </Link>
            <div>{user.user.name} Loged In</div>
          </div>
          <button
            onClick={logoutHandler}
            type="text"
            className="border-blue-600 border-2 p-2   rounded"
          >
            Log Out
          </button>
        </nav>
      </div>
    </div>
  )
}
