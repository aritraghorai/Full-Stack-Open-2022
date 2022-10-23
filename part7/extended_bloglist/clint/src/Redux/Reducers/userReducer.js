import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: undefined,
  token: undefined
}
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUserState: (state, action) => {
      console.log(action.payload)
      const { name, username, token, id } = action.payload
      state.user = {
        name,
        username,
        id
      }
      state.token = token
      return state
    },
    logoutCurrentUser: (state) => {
      state.token = undefined
      state.user = undefined
    }
  }
})

export const { addUserState, logoutCurrentUser } = userSlice.actions
export const getUserDetail = (state) => state.user
export default userSlice.reducer
