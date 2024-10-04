import {useState, useEffect} from 'react'

import countryService from './services/countries.js'

import CountryName from './components/CountryName.jsx'
import CountryInput from './components/CountryInput.jsx'
import CountryList from './components/CountryList.jsx'

const App = () => {
  const [countries, setCountries] = useState(null)
  const [input, setInput] = useState('')
  const [showedCountries, setShowedCountries] = useState([])

  useEffect(() => {
    countryService
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
  }, [])

  if (!countries) {
    return null
  }

  const changeCountryInput = (event) => {
    setInput(event.target.value)
  }

  const changeShowedCountries = (country) => {
    if (showedCountries.includes(country.name.common)) {
      setShowedCountries(showedCountries.filter(c => c === country))
    } else {
      setShowedCountries(showedCountries.concat(country))
    }
    console.log(showedCountries)
  }

  const countriesToShow = countries.filter(
    country => country.name.common.toLowerCase().includes(input.toLowerCase())
  )
  
  return <div>
    <CountryInput 
      value = {input}
      handleInputChange={changeCountryInput}
    />
    <CountryList showedCountries = {showedCountries} countries = {countriesToShow} changeShowedCountries = {changeShowedCountries}/>
    </div>
}

export default App