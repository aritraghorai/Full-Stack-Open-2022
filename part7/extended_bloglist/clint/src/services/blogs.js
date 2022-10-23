import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

export const setToken = (usertoken) => {
  token = usertoken
  console.log(token)
}

export const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  return response.data
}
export const addBlog = async (data) => {
  token = JSON.parse(localStorage.getItem('user')).token
  const config = { headers: { Authorization: `Bearer ${token}` } }
  const request = axios.post(baseUrl, data, config)
  const res = await request
  return res
}

export const updateBlogbyId = async (id, data) => {
  token = JSON.parse(localStorage.getItem('user')).token
  const config = { headers: { Authorization: `Bearer ${token}` } }
  const request = axios.put(`${baseUrl}/${id}`, data, config)
  const res = await request
  return res
}

export const deleteBlogById = async (id) => {
  token = JSON.parse(localStorage.getItem('user')).token
  const config = { headers: { Authorization: `Bearer ${token}` } }
  const request = axios.delete(`${baseUrl}/${id}`, config)
  const res = await request
  return res
}
