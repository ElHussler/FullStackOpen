import { useState, useEffect } from 'react'
import personService from './services/person'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import ErrorMessage from './components/ErrorMessage'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])
  
  const nameTaken = () => {
    console.log('persons: ', persons)
    console.log('person with same name as entered: ', persons.find(persons => persons.name === newName))
    return persons.find(persons => persons.name === newName)
  }

  const showTimedError = (messageContent, seconds) => {
    setErrorMessage(messageContent)
    setTimeout(() => {
      setErrorMessage(null)
    }, seconds)
  }

  const showTimedMessage = (messageContent, seconds) => {
    setMessage(messageContent)
    setTimeout(() => {
      setMessage(null)
    }, seconds)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const enteredPerson = { name: newName, number: newNumber }
    const personExists = nameTaken()

    if (personExists) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .update(personExists.id, enteredPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
            showTimedMessage(`Updated number for ${returnedPerson.name} successfully`, 5000)
          })
          .catch(error => {
            console.log('error occurred: ', error)
            showTimedError(`Information of ${enteredPerson.name} has already been removed from server`, 5000)
          })
      }
    }
    else
      personService
        .create(enteredPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          showTimedMessage(`Added ${returnedPerson.name} successfully`, 5000)
        })
        .catch(error => {
          console.log('error occurred: ', error)
          showTimedError(`Information of ${enteredPerson.name} could not be added to server`, 5000)
        })
  }

  const handleDelete = (id) => {
    const personToDelete = persons.find(person => person.id === id)

    if (window.confirm(`Delete ${personToDelete.name} ? `))
      personService
        .deletePerson(id)
        .then(returnedPerson => {
          setPersons(persons.filter(person => person.id !== returnedPerson.id))
          showTimedMessage(`Deleted ${returnedPerson.name} successfully`, 5000)
        })
        .catch(error => {
          console.log('error occurred: ', error)
          showTimedError(`Information of ${personToDelete.name} has already been removed from server`, 5000)
        })
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

      <ErrorMessage errorMessage={errorMessage} />
      <Notification message={message} />

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
      
      <Persons persons={persons} searchName={searchName} handleDelete={handleDelete} />
    </div>
  )
}

export default App