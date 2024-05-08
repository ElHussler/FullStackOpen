const Persons = ({ persons, searchName }) => {
    const personsToShow = 
        (searchName === '')
        ? persons
        : persons.filter(person => person.name.toLowerCase().includes(searchName))

    return (
        <div>
            {personsToShow.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
        </div>
    )
}

export default Persons