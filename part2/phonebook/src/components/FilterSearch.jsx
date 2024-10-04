const FilterSearch = ({filter, updateFilter}) => {
    return (<div>Filter search: <input value = {filter} onChange = {updateFilter}></input></div>)
}

export default FilterSearch