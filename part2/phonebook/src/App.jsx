import { useState, useEffect } from 'react'
import axios from 'axios'
import FilterSearch from './components/FilterSearch'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

import personService from './services/persons'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber,
    }

    for (const person of persons) {
      if (person.name === newName) {
        if (confirm(`${person.name} is already added to phonebook, replace old number with new one?`)) {
          personService
            .update(persons.filter(person => person.name === newName)[0].id, newPerson)
            .then(returnedPerson => {
              setNotification(`Updated ${newName}'s number`)
              setTimeout(() => {
                setNotification(null)
              }, 5000)
              setPersons(persons.filter(person => person.name !== newName).concat(returnedPerson))
              setNewName('')
            })
            .catch(error => {
              setNotification(`Error occurred: person was already deleted`)
              setTimeout(() => {
              setNotification(null)
              }, 5000)
              setPersons(persons.filter(person => person.name !== newName))
            })
          return
        } else {
          return
        }
      }
    }

    

    personService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNotification(`Added ${newPerson.name} to the phonebook`)

        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
  }

  const deletePerson = (id) => {
    if (confirm(`Are you sure you want to delete ${persons.find(n => n.id == id).name}?`)) {
      personService
      .del(id)
      .then(() => {personService.getAll()
              .then(initialPersons => {
                setPersons(initialPersons)
              })
        })
      .catch(error => {
        setNotification(`Error occurred: person was already deleted`)
        setTimeout(() => {
          setNotification(null)
        }, 5000)
        setPersons(persons.filter(n => n.id !== id))
        })
    }
  }
    

  const updateNewName = (event) => {
    setNewName(event.target.value)
  }

  const updateNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const updateFilter = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message = {notification} />
      <FilterSearch filter = {filter} updateFilter = {updateFilter}/>
      
      <h2>Add New</h2>
      <PersonForm addPerson = {addPerson} newName = {newName} updateNewName = {updateNewName} newNumber= {newNumber} updateNewNumber = {updateNewNumber} />
      
      <h2>Numbers</h2>
      <Persons persons = {persons} filter = {filter} deleteButton = {id => deletePerson(id)}/>
    </div>
  )
}

export default App