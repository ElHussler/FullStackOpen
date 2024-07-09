import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { notification: '' },
  reducers: {
    setNotification(state, action) {
      state.notification = action.payload
    },
    removeNotification(state) {
      state.notification = ''
    }
  }
})

export const { setNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer