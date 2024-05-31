const Persons = ({ persons, searchName, handleDelete }) => {
    const personsToShow = 
        (searchName === '')
        ? persons
        : persons.filter(person => person.name.toLowerCase().includes(searchName))

    return (
        <div>
            {personsToShow.map(person =>
                <p key={person.name}>{person.name} {person.number} 
                    <button onClick={() => handleDelete(person.id)}>delete</button>
                </p>
            )}
        </div>
    )
}

export default Persons