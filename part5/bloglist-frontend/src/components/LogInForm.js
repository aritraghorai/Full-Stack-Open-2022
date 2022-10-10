import React from 'react'
import login from '../services/user'
import { setToken } from '../services/blogs'

function LogInForm({ setUser, setMessage }) {
  const onSubmitHandler = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData)
    try {
      const res = await login(data)
      localStorage.setItem('user', JSON.stringify(res))
      setToken(res.token)
      console.log(res)
      setUser(res)
      setMessage({
        message: 'Login Sucessfuly',
        type: 'success'
      })
      setTimeout(() => {
        setMessage({ message: undefined, type: undefined })
      }, 5000)
    } catch (error) {
      setMessage({
        message: 'Invalid username and password',
        type: 'error'
      })
      setTimeout(() => {
        setMessage({ message: undefined, type: undefined })
      }, 5000)
    }
  }
  return (
    <form onSubmit={onSubmitHandler}>
      <div>
        username <input type="text" name="username" required id="username" />
      </div>
      <div>
        password
        <input type="password" name="password" required id="password" />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default LogInForm
