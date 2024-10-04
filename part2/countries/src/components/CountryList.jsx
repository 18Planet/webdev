import CountryName from './CountryName'

const CountryList = ({countries, changeShowedCountries, showedCountries}) => {
    console.log(countries.length)
    if (countries.length > 10) {
        return <div>Too many matches, specify another filter.</div>
    } else if (countries.length > 1) {
        return <div>
            {countries.map(
            country => <CountryName country={country} fullInfo = {showedCountries.includes(country)} key={country.name.official} changeShowedCountries = {() => {
                changeShowedCountries(country)
                console.log('got here')
            }} />
            )}
        </div>
    } else if (countries.length === 1) {
        const country = countries[0]

        return <div>
            <CountryName country = {country} fullInfo = {true} key = {country.name.official} />
        </div>
    } else {
        return null
    }
}

export default CountryList