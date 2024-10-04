const Course = ({course}) => {
    const val = 0
    const sum = course.parts.reduce((part, currVal) => {
      return part + currVal.exercises
    }, val)
  
    return (
    <>
      <Header course = {course.name} />
      <Content parts = {course.parts} />
  
  
      <Total sum = {sum} />
    </>
    )
  }

const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <p>Number of exercises {sum}</p>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {parts.map(part => 
      <p key = {part.id}>
        {part.name} {part.exercises}
      </p>
    )}    
  </>


export default Course