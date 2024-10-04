const CountryInput = ({value, handleInputChange}) => {
    return <div>Find countries: <input
            value={value}
            onChange = {handleInputChange}
        />
    </div>
}

export default CountryInput