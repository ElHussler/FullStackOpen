import { createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "VOTE":
      state = `anecdote '${action.payload}' voted`
      return state
    case "CREATE":
      state = `anecdote '${action.payload}' created`
      return state
    case "ERROR":
      return action.payload
    default:
      return ''
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')

  return (
    <NotificationContext.Provider value={ [notification, notificationDispatch] }>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext