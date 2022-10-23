import appApi from './baseApi'

const commentApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllComments: builder.query({
      query: (body) => ({
        url: `/blogs/${body.id}/comments`
      }),
      providesTags: (_result, _error, arg) => [
        { id: arg.id, type: 'Blog Id' },
        'Comment'
      ]
    }),
    addNewComment: builder.mutation({
      query: (body) => ({
        url: `/blogs/${body.id}/comments`,
        method: 'POST',
        body: { content: body.content }
      }),
      invalidatesTags: ['Comment']
    })
  })
})

export const { useGetAllCommentsQuery, useAddNewCommentMutation } = commentApi
