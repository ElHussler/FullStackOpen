import { useState } from 'react'

const Header = ({ text }) => <><h1>{text}</h1></>

const Button = ({ text, handleClick }) => <><button onClick={handleClick}>{text}</button></>

const GiveFeedback = ({ good, setGood, neutral, setNeutral, bad, setBad }) => {
  return (
    <div>
      <Header text='give feedback' />
      <Button text='good' handleClick={() => setGood(good + 1)} />
      <Button text='neutral' handleClick={() => setNeutral(neutral + 1)} />
      <Button text='bad' handleClick={() => setBad(bad + 1)} />
    </div>
  )
}

const StatisticLine = ({ text, total, isPercentage }) => <><p>{text} {total} {isPercentage? '%' : ''}</p></>

const Statistics = ({ good, neutral, bad }) => {
  const calculateTotal = () => {
    return good + neutral + bad
  }

  const calculateAverage = () => {
    let goodRatingValue = good * 1
    let neutralRatingValue = neutral * 0
    let badRatingValue = bad * -1
    let reviewCount = calculateTotal()

    return ((goodRatingValue + neutralRatingValue + badRatingValue) / reviewCount)
  }

  const calculateGoodPercentage = () => {
    return (good / calculateTotal()) * 100
  }

  if (!good && !neutral && !bad) {
    return (
      <div>
        <Header text='statistics' />
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div>
      <Header text='statistics' />
      <StatisticLine text='good' total={good} />
      <StatisticLine text='neutral' total={neutral} />
      <StatisticLine text='bad' total={bad} />
      <StatisticLine text='all' total={good + neutral + bad} />
      <StatisticLine text='average' total={calculateAverage()} />
      <StatisticLine text='positive' total={calculateGoodPercentage()} isPercentage={true} />
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <GiveFeedback
        good={good} setGood={setGood}
        neutral={neutral} setNeutral={setNeutral}
        bad={bad} setBad={setBad} />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App