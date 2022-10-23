import appApi from './baseApi'

const userApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTheUser: builder.query({
      query: () => ({ url: '/users' }),
      providesTags: ['User']
    }),
    getUserDetailById: builder.query({
      query: (body) => ({ url: `users/${body.id}` }),
      invalidatesTags: (_result, _error, arg) => [{ id: arg.id }]
    })
  }),
  overrideExisting: true
})

export const { useGetAllTheUserQuery, useGetUserDetailByIdQuery } = userApi
export default userApi
