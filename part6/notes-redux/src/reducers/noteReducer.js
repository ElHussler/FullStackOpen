import { createSlice, current } from '@reduxjs/toolkit'
import noteService from '../services/notes'

const noteSlice = createSlice({
  name: 'notes',
  initialState: [],
  reducers: {
    toggleImportanceOf(state, action) {
      const id = action.payload
      const noteToChange = state.find(n => n.id === id)
      const changedNote = { 
        ...noteToChange, 
        important: !noteToChange.important 
      }
      
      console.log(current(state))

      return state.map(note =>
        note.id !== id ? note : changedNote 
      )     
    },
    setNotes(state, action) {
      return action.payload
    },
    appendNote(state, action) {
      state.push(action.payload)
    }
  },
})

export const initializeNotes = () => {
  return async dispatch => {
    const notes = await noteService.getAll()
    dispatch(setNotes(notes))
  }
}

export const createNote = content => {
  return async dispatch => {
    const newNote = await noteService.createNew(content)
    dispatch(appendNote(newNote))
  }
}

export const { toggleImportanceOf, appendNote, setNotes } = noteSlice.actions
export default noteSlice.reducer