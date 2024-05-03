import { useState } from 'react'

const Header = ({ text }) => <h1>{text}</h1>

const Button = ({ text, handleClick }) => <button onClick={handleClick}>{text}</button>

const GiveFeedback = ({ good, setGood, neutral, setNeutral, bad, setBad }) => {
  const setGoodReview = () => {
    console.log('setGoodReview called')
    setGood(good + 1)
  }

  const setNeutralReview = () => {
    console.log('setNeutralReview called')
    setNeutral(neutral + 1)
  }

  const setBadReview = () => {
    console.log('setBadReview called')
    setBad(bad + 1)
  }

  return (
    <div>
      <Header text='give feedback' />
      <Button text='good' handleClick={() => setGoodReview()} />
      <Button text='neutral' handleClick={() => setNeutralReview()} />
      <Button text='bad' handleClick={() => setBadReview()} />
    </div>
  )
}

const DisplayTotal = ({ text, total }) => <><p>{text} {total}</p></>

const DisplayResults = ({ good, neutral, bad }) => {
  return (
    <div>
      <Header text='statistics' />
      <DisplayTotal text='good' total={good} />
      <DisplayTotal text='neutral' total={neutral} />
      <DisplayTotal text='bad' total={bad} />
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

      <DisplayResults good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App