const PersonForm = ({addPerson, newName, updateNewName, newNumber, updateNewNumber}) => {
    return (<div><form onSubmit = {addPerson}> 
        <div>
          name: <input 
            value = {newName}
            onChange = {updateNewName}
          />
        </div>
        <div>
          number: <input 
          value = {newNumber}
          onChange = {updateNewNumber}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
    </form></div>)
    
}

export default PersonForm