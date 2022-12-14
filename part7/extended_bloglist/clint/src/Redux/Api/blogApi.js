import appApi from './baseApi'

const blogApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    blogs: builder.query({
      query: () => ({ url: '/blogs' }),
      providesTags: ['Blog']
    }),
    getBlogById: builder.query({
      query: (body) => ({ url: `blogs/${body.id}` }),
      providesTags: (_result, _error, arg) => [
        { id: arg.id, type: 'Blog Id' },
        'BlogById'
      ]
    }),
    addBlogs: builder.mutation({
      query: (body) => ({
        url: '/blogs',
        body,
        method: 'POST'
      }),
      invalidatesTags: ['Blog', 'User']
    }),
    updateBlogs: builder.mutation({
      query: function (payload) {
        console.log(payload)
        const { id, blog } = payload
        return {
          url: `/blogs/${id}`,
          body: blog,
          method: 'PUT'
        }
      },
      invalidatesTags: ['blogs', 'BlogById']
    }),
    deleteBlog: builder.mutation({
      query: function (id) {
        return {
          url: `/blogs/${id}`,
          method: 'DELETE'
        }
      },
      invalidatesTags: ['Blog', 'User']
    })
  }),
  overrideExisting: true
})

export default blogApi
export const {
  useBlogsQuery,
  useAddBlogsMutation,
  useUpdateBlogsMutation,
  useDeleteBlogMutation,
  useGetBlogByIdQuery
} = blogApi
