import { useEffect, useState } from "react";
import axios from 'axios'

const Weather = ({ cityName }) => {
    const [cityWeather, setCityWeather] = useState(null)

    console.log('Weather component rendered for cityName: ', cityName)

    useEffect(() => {
        console.log('Weather component useEffect triggered')
        const api_key = import.meta.env.VITE_SOME_KEY
        const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'
        console.log('axios is now calling the openweathermap api')
        axios
            .get(`${baseUrl}?q=${cityName}&appid=${api_key}`)
            .then(response =>
                setCityWeather(response.data)
            )
        console.log('axios has now called the openweathermap api')
    }, [cityName])

    console.log(cityWeather)

    if (cityWeather !== null) {        
        const temperatureInCelsius = (cityWeather.main.temp - 273.15).toFixed(2)
        const weatherIconUrl = `https://openweathermap.org/img/wn/${cityWeather.weather[0].icon}@2x.png`

        return (
            <>
                <h3>Weather for {cityName}</h3>
                <p>temperature: {temperatureInCelsius} Celsius</p>
                <img src={weatherIconUrl} alt={cityWeather.weather[0].description} />
                <p>wind: {cityWeather.wind.speed} m/s</p>
            </>
        )
    }
}

export default Weather