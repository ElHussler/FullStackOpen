import { useQuery } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import axios from 'axios'

const App = () => {

  const { data, isLoading, isError } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: () => axios.get('http://localhost:3001/anecdotes').then(res => res.data),
    retry: 1,
    refetchOnWindowFocus: false
  })

  if (isLoading)
    return <div>Loading anecdotes...</div>
  
  if (isError)
    return <div>Anecdote service note available due to problems in server</div>

  const handleVote = (anecdote) => {
    console.log('vote')
  }

  const anecdotes = data
  console.log('anecdotes: ', anecdotes)

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
