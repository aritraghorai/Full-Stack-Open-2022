import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
  baseUrl: '/api',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().user.token
    headers.set('Content-Type', 'application/json')
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  }
})

//*Global Configiration For our App
const appApi = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: ['User', 'Blog', 'Auth', 'BlogById'],
  endpoints: () => ({}),
  keepUnusedDataFor: 30
})

export default appApi
