import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const nameTaken = () => {
    return persons.filter(persons => persons.name === newName).length > 0
  }

  const postPerson = (newPerson) => {
    console.log('postPerson called');
    axios
      .post('http://localhost:3001/persons', newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson.data))
        setNewName('')
        setNewNumber('')
        console.log('POST done, person STATE updated, new name/number STATE blanked');
      })
  }

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = { name: newName, number: newNumber }

    nameTaken()
      ? alert(`${newName} is already added to phonebook`)
      : postPerson(newPerson)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchNameChange = (event) => {
    setSearchName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter searchName={searchName} handleSearchNameChange={handleSearchNameChange} />

      <h3>Add a new</h3>

      <PersonForm 
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />

      <h3>Numbers</h3>
      
      <Persons persons={persons} searchName={searchName} />
    </div>
  )
}

export default App