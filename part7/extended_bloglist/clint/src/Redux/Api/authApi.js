import appApi from './baseApi'

const authApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (user) => ({
        url: 'users/login',
        method: 'post',
        body: user
      }),
      invalidatesTags: ['Blog', 'User']
    })
  })
})

export default authApi
export const { useLoginMutation } = authApi
