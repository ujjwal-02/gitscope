import { configureStore } from '@reduxjs/toolkit'
import { githubApi } from './githubApi'
import searchReducer from './searchSlice'

export const store = configureStore({
  reducer: {
    [githubApi.reducerPath]: githubApi.reducer,
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(githubApi.middleware),
})

// These types power useSelector and useDispatch across the whole app
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch