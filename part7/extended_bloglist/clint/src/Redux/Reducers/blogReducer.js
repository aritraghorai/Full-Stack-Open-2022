import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  blogs: []
}

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    addAllblogs: (state, action) => {
      state.blogs = action.payload
    }
  }
})

export default blogSlice.reducer
export const { addAllblogs } = blogSlice.actions
