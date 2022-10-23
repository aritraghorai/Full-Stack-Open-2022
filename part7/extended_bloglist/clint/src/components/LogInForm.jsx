import React, { useEffect } from 'react'
import { useLoginMutation } from '../Redux/Api/authApi'
import { useDispatch } from 'react-redux'
import { addUserState } from '../Redux/Reducers/userReducer'

function LogInForm() {
  const [Login, { isLoading, data: userData, isSuccess }] = useLoginMutation()
  const dispatch = useDispatch()

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData)
    await Login(data)
  }
  useEffect(() => {
    if (isSuccess) {
      dispatch(addUserState(userData))
    }
  }, [isSuccess])
  if (isLoading) {
    return <div>Loading</div>
  }

  return (
    <div
      className="body-bg min-h-screen pt-12 md:pt-20 pb-6 px-2 md:px-0"
      style={{
        backgroundColor: 'gray',
        backgroundInage: 'linear-gradient(315deg, #9921e8 0%, #5f72be 74%)'
      }}
    >
      <header className="max-w-lg mx-auto">
        <a href="#">
          <h1 className="text-4xl font-bold text-white text-center">
            Blog App
          </h1>
        </a>
      </header>

      <main className="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
        <section>
          <h3 className="font-bold text-2xl">Welcome to Blog App</h3>
          <p className="text-gray-600 pt-2">Sign in to your account.</p>
        </section>

        <section className="mt-10">
          <form className="flex flex-col" onSubmit={onSubmitHandler}>
            <div className="mb-6 pt-3 rounded bg-gray-200">
              <label
                className="block text-gray-700 text-sm font-bold mb-2 ml-3"
                htmlFor="username"
                name="username"
              >
                UserName
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="bg-gray-200
                    rounded w-full text-gray-700 focus:outline-none border-b-4
                    border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
              />
            </div>
            <div className="mb-6 pt-3 rounded bg-gray-200">
              <label
                className="block text-gray-700 text-sm font-bold mb-2 ml-3"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="bg-gray-200 rounded w-full
                    text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600
                    transition duration-500 px-3 pb-3"
              />
            </div>
            <div className="flex justify-end">
              <a
                href="#"
                className="text-sm text-purple-600 hover:text-purple-700 hover:underline mb-6"
              >
                Forgot your password?
              </a>
            </div>
            <button
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
              type="submit"
            >
              Sign In
            </button>
          </form>
        </section>
      </main>

      <div className="max-w-lg mx-auto text-center mt-12 mb-6">
        <p className="text-white">
          <span> have not any account?</span>
          <a href="#" className="font-bold hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  )
}

export default LogInForm
