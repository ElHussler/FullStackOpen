import { useDispatch } from 'react-redux'
import { createNewAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdote'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  
  const create = async (event) => {
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value = ''
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createNewAnecdote(newAnecdote))
    dispatch(setNotification(`you created '${content}'`))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div>
          <input name='content' />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm