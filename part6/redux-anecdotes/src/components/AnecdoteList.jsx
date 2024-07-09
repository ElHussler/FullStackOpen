import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const { anecdotes, filter } = useSelector(state => state)

  const filterAnecdotes = (anecdotes) => {
    if (filter.filter !== '')
      return anecdotes.filter(anecdote => anecdote.content.includes(filter.filter))
    
    return [...anecdotes]
  }

  return (
    <div>
      {filterAnecdotes(anecdotes)
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(addVote(anecdote.id))}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList