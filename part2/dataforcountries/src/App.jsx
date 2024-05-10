import { useEffect, useState } from 'react'
import axios from 'axios'
import CountryList from './components/CountryList'


const App = () => {
  const [countryToFind, setCountryToFind] = useState('')
  const [countryList, setCountryList] = useState([])

  useEffect(() => {
    if (countryToFind !== '') {
      const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'
      axios
        .get(`${baseUrl}/all`)
        .then(response =>
          setCountryList(response.data)
        )
    }
  }, [countryToFind])

  const handleCountryChange = (event) => {
    setCountryToFind(event.target.value)
  }

  return (
    <div>
      <p>find countries <input type='text' value={countryToFind} onChange={handleCountryChange} /></p>

      <CountryList countryToFind={countryToFind} countryList={countryList} />
    </div>
  )
}

export default App
