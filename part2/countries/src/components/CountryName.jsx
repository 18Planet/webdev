const CountryName = ({country, fullInfo, changeShowedCountries}) => {
    let info = fullInfo
    if (!info) {
        return <div>{country.name.common} 
            <button onClick={changeShowedCountries}>
                show</button></div>
    } else {
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
        </div>
    }
}

export default CountryName