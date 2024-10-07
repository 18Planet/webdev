import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'
const api_key = import.meta.env.VITE_API

const getAll = () => {
    const request = axios.get(`${baseUrl}/all`)
    return request.then(response => {
        return response.data
    })
}

const getWeather = country => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}&units=metric`
    const request = axios.get(url)
    return request.then(response => {
        return response.data
    })
}

const getWeatherIcon = (code, day) => {
    let icon = ''

    if (code <= 232) {
        icon = '11d'
    } else if (code <= 321) {
        icon = '09d'
    } else if (code <= 504) {
        icon = '10d'
    } else if (code == 511) {
        icon = '13d'
    } else if (code <= 531) {
        icon = '09d'
    } else if (code <= 622) {
        icon = '13d'
    } else if (code <= 781) {
        icon = '50d'
    } else if (code == 800) {
        icon = (day ? '01d' : '01n')
    } else if (code == 801) {
        icon = (day ? '02d' : '02n')
    } else if (code == 802) {
        icon = (day ? '03d' : '03n')
    } else if (code <= 804) {
        icon = (day ? '04d' : '04n')
    }

    const url = `https://openweathermap.org/img/wn/${icon}@2x.png`
    const request = axios.get(url)
    return request.then(response => {
        return response.data
    })
}

export default { getAll, getWeather, getWeatherIcon }