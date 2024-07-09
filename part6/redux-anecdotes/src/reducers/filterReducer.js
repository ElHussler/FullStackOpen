import { createSlice, current } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filter',
  initialState: { filter: "" },
  reducers: {
    updateFilter(state, action) {
      state.filter = action.payload
      console.log('state', current(state))
    }
  }
})

export const { updateFilter } = filterSlice.actions
export default filterSlice.reducer