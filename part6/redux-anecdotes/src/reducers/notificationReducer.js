import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { notification: '' },
  reducers: {
    showNotification(state, action) {
      state.notification = action.payload
    },
    clearNotification(state) {
      state.notification = ''
    }
  }
})

export const setNotification = (message, seconds) => {
  return async dispatch => {
    await dispatch(showNotification(message))
    setTimeout(() => {
      dispatch(clearNotification())
    }, seconds ? (seconds * 1000) : 5000 )
  }
}

export const { showNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer