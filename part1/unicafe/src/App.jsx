import { useState } from 'react'

const Header = () => {
  return (
    <>
      <h1>Give feedback</h1>
    </>
  )
}

const Button = ({handleClick, text}) => {
  return (
    <>
      <button onClick = {handleClick}>
        {text}
      </button>
    </>
  )
}

const StatisticsHeader = () => {
  return (
    <>
      <h1>Statistics</h1>
    </>
  )
}

const StatisticLine = ({text, value, label}) => {
  return (
    <>
      <tr>
        <td>{text}:</td>
        <td>{value}{label}</td>
      </tr>
    </>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad

  if (all == 0) {
    return (
      <>
      <p>
        No feedback given.
      </p>
      </>
    )
  }
  
  return (
    <>
    <table>
        <StatisticLine text = "Good" value = {good} />
        <StatisticLine text = "Neutral" value = {neutral} />
        <StatisticLine text = "Bad" value = {bad} />
        <StatisticLine text = "All" value = {all} />
        <StatisticLine text = "Average" value = {(good - bad) / all} />
        <StatisticLine text = "Positive" value = {(good / all) * 100} label = '%'/>
    </table>
        
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header />

      <Button handleClick = {() => setGood(good + 1)} text = 'Good' />
      <Button handleClick = {() => setNeutral(neutral + 1)} text = 'Neutral' />
      <Button handleClick = {() => setBad(bad + 1)} text = 'Bad' />

      <StatisticsHeader />
      <Statistics good = {good} neutral = {neutral} bad = {bad} />
    </div>
  )
}

export default App