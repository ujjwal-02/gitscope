import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RepoFilters } from '../types/github'

interface SearchState {
  username: string
  filters: RepoFilters
  history: string[]
}

const initialState: SearchState = {
  username: 'torvalds',
  filters: {
    search: '',
    sort: 'stars',
    type: 'all',
  },
  history: ['torvalds'],
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setUsername(state, action: PayloadAction<string>) {
      state.username = action.payload
      // Add to history, no duplicates, max 5
      state.history = [
        action.payload,
        ...state.history.filter((h) => h !== action.payload),
      ].slice(0, 5)
    },
    setFilters(state, action: PayloadAction<Partial<RepoFilters>>) {
      state.filters = { ...state.filters, ...action.payload }
    },
    resetFilters(state) {
      state.filters = initialState.filters
    },
    removeFromHistory(state, action: PayloadAction<string>) {
      state.history = state.history.filter((h) => h !== action.payload)
    },
  },
})

export const { setUsername, setFilters, resetFilters, removeFromHistory } =
  searchSlice.actions
export default searchSlice.reducer