import { useState } from 'react'

const Header = ({ text }) => <h1>{text}</h1>

const Button = ({ text, handleClick }) => <button onClick={handleClick}>{text}</button>

const GiveFeedback = ({ handleGood, handleNeutral, handleBad }) => {
  return (
    <div>
      <Header text='give feedback' />
      <Button text='good' handleClick={handleGood} />
      <Button text='neutral' handleClick={handleNeutral} />
      <Button text='bad' handleClick={handleBad} />
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
      <GiveFeedback good={good} handleGood={() => setGoodReview()}
        neutral={neutral} handleNeutral ={() => setNeutralReview()}
        bad={bad} handleBad ={() => setBadReview()} />

      <DisplayResults good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App