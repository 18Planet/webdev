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
    let need_confirmation = false
    let error = false
    for (const person of persons) {
      if (person.name === newName) {
        if (confirm(`${person.name} is already added to phonebook, replace old number with new one?`)) {
          need_confirmation = true
          error = deletePerson(person.id, false)
          console.log(error)
        } else {
          return
        }
      }
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    }

    personService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        if (need_confirmation) {
          if (error) {
            setNotification(`Error occurred: ${newPerson.name} was just deleted`)
            setPersons(persons.filter(n => n.name !== newPerson.name))
          } else {
            setNotification(`Updated ${newPerson.name}'s number`)
          }
          
        } else {
          setNotification(`Added ${newPerson.name} to the phonebook`)
        }

        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
      .catch(error => {
        setNotification(`Error occurred: ${newPerson.name} was just deleted`)
        setTimeout(() => {
          setNotification(null)
        }, 5000)
        setPersons(persons.filter(n => n.name !== newPerson.name))
      })
  }

  const deletePerson = (id, confirms) => {
    let returned_error = false
    if (confirms) {
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
        returned_error = true
        })
      }
    } else {
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
          console.log('got here')
          returned_error = true
          })
      }
      console.log(returned_error)
      return returned_error
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
      <Persons persons = {persons} filter = {filter} deleteButton = {id => deletePerson(id, true)}/>
    </div>
  )
}

export default App