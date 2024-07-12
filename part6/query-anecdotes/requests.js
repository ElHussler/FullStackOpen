import axios from "axios"

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () =>
  axios.get(baseUrl).then(res => res.data)

export const createAnecdote = newAnecdote => {
  return axios.post(baseUrl, newAnecdote)
    .then(res => res.data)
    .catch(error => {
      if (error.response) {
        return Promise.reject(new Error(error.response.data.error || 'error.response hit'))
      } else if (error.request) {
        return Promise.reject(new Error('No response received from the server'))
      } else {
        return Promise.reject(new Error(error.message))
      }
    })
}

export const updateAnecdote = anecdote =>
  axios.put(`${baseUrl}/${anecdote.id}`, anecdote).then(res => res.data)