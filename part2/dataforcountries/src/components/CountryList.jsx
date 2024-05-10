const CountryList = ({ countryToFind, countryList }) => {
    const countriesToShow = countryList.filter(c => c.name.common.toLowerCase().includes(countryToFind.toLowerCase()))
    const countryCount = countriesToShow.length

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
                    <p key={c.cca2}>{c.name.common}</p>
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
            </>
        )
    }
}

export default CountryList