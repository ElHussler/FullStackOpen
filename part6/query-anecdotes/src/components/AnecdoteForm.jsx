import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../../requests'
import NotificationContext from '../NotificationContext'
import { useContext } from 'react'

const AnecdoteForm = () => {
  const dispatchNotification = useContext(NotificationContext)[1]
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (response) => {
      console.log('reached onsuccess callback: ', response);
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
    onError: (error) => {
      dispatchNotification({ type: "ERROR", payload: error.message })
      setTimeout(() => {
        dispatchNotification({})
      }, 5000);
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
    dispatchNotification({ type: "CREATE", payload: content })
    setTimeout(() => {
      dispatchNotification({})
    }, 5000)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm