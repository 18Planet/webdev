import {useState} from 'react'

import countryService from '../services/countries.js'

const CountryName = ({country, fullInfo, changeShowedCountries}) => {
    const [weather, setWeather] = useState(null)
    const [weatherIcon, setWeatherIcon] = useState(null)

    let info = fullInfo
    if (!info) {
        return <div>{country.name.common} 
            <button onClick={changeShowedCountries}>
                show</button></div>
    } else {
        console.log('here')
        
        countryService
            .getWeather(country)
            .then(response => {
                setWeather(response)
            })
        
        if (!weather) {
            return null
        }

        
        
        /* countryService
            .getWeatherIcon(weather[0].id, weather.dt > weather.sys.sunrise && weather.dt < weather.sys.sunset)
            .then(response => {
                setWeatherIcon(response)
            })
        */
        
        
        return <div>
            <h1>{country.name.common}</h1>
            <div>Capital: {country.capital}</div>
            <div>Area: {country.area}</div>
            <h3>Languages: </h3>
            <div>{Object.entries(country.languages).map(([key, value]) => (
                <div key = {key}>
                    {value}
                </div>
            ))}</div>
            <br></br>
            <img src={`${country.flags.png}`}/>
            <h3>Weather in {country.capital}</h3>
            <div>Temperature: {weather.main.temp} Celsius</div>
            
        </div>
    }
}

export default CountryName