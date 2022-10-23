import axios from 'axios'

const baseUrl = '/api/users'

const login = async (body) => {
  const request = axios.post(`${baseUrl}/login`, body)
  const res = await request
  return res.data
}

export default login
