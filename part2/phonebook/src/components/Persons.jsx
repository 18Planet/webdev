const Person = ({person, deleteButton}) => {
    const label = 'Delete'
    return(<div>
        {person.name} {person.number} <button onClick = {deleteButton}>{label}</button>
    </div>)
}

const Persons = ({persons, filter, deleteButton}) => {
    return (<div>
        {persons.filter(
            person => person.name.toLowerCase().includes(filter.toLowerCase()))
                .map(person => <Person person = {person} key = {person.id} deleteButton = {() => deleteButton(person.id)}/>)}
    </div>)
}

export default Persons