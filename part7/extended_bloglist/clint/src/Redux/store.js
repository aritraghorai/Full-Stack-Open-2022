import { configureStore } from '@reduxjs/toolkit'
import getState from '../Util/localstorage/getState'
import userReducer from './Reducers/userReducer'
import setState from '../Util/localstorage/setState'
import appApi from './Api/baseApi'

const store = configureStore({
  reducer: {
    user: userReducer,
    [appApi.reducerPath]: appApi.reducer
  },
  preloadedState: {
    user: getState()
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(appApi.middleware)
})

store.subscribe(() => {
  setState(store.getState().user)
})

export default store
