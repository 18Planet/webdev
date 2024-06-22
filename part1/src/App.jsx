const Hello = (props) => {
  console.log(props)
  return (
    <div>
      <p>Hello {props.name} you are {props.age} years old</p>
    </div>
  )
}

const App = () => {
  const name = 'Peter'
  const age = 10

  return (
    <>
      <h1>Greetings</h1>
      <Hello name = 'George' age = {36 + 40}/>
      <Hello name = 'George' age = {15}/>
      <Hello name = 'Daisy' age = {age}/>
    </>
  )
}

export default App