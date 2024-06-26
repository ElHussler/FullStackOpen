import Weather from "./Weather"

const CountryList = ({ countryToFind, countryList, setCountryToFind }) => {
    const countriesToShow = countryList.filter(c => c.name.common.toLowerCase().includes(countryToFind.toLowerCase()))
    const countryCount = countriesToShow.length

    const handleShowCountry = (countryName) => {
        setCountryToFind(countryName)
    }

    if (countryToFind === '')
        return (
            <p>Enter a filter</p>
        )

    if (countryCount < 1)
        return (
            <p>No matches found, specify another filter</p>
        )

    if (countryCount > 10)
        return (
            <p>Too many matches, specify another filter</p>
        )

    if (countryCount > 1 && countryCount < 11)
        return (
            <>
                {countriesToShow
                .map(c => (
                    <p key={c.cca2}>{c.name.common} <button onClick={() => handleShowCountry(c.name.common)}>show</button></p>
                ))}
            </>
        )

    if (countryCount === 1) {
        const returnedCountry = countriesToShow[0]
        const printableLanguages = Object.values(returnedCountry.languages)

        return (
            <>
                <h1>{returnedCountry.name.common}</h1>
                <p>capital: {returnedCountry.capital}</p>
                <p>area: {returnedCountry.area}</p>

                <h3>languages:</h3>
                <ul>
                    {printableLanguages
                        .map(lang =>
                            <li key={lang}>{lang}</li>
                        )
                    }
                </ul>

                <img src={returnedCountry.flags['png']} alt={returnedCountry.flags['alt']} />

                <Weather cityName={returnedCountry.capital} />
            </>
        )
    }
}

export default CountryList