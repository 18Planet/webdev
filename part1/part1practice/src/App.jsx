import { useState } from 'react'

const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }
  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick = {handleClick}>
    {text}
  </button>
)


const App = (props) => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])
  const [total, setTotal] = useState(0)

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    const newLeft = left + 1

    setLeft(newLeft)
    setTotal(newLeft + right)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    const newRight = right + 1

    setRight(newRight)
    setTotal(left + newRight)
  }

  return ( 
    <>
      {left}
      <Button handleClick={handleLeftClick} text = 'left' />
      <Button handleClick={handleRightClick} text = 'right' />

      {right}
      <History allClicks = {allClicks} />
      
    </> )
}

export default App