const Header = ({ name }) => <h1>{name}</h1>

const Total = ({ parts }) => {
    const exercises = parts.map(parts => parts.exercises)
    const total = exercises.reduce((accumulator, currentValue) => accumulator + currentValue, 0)

    return (
        <p>Number of exercises {total}</p>
    )
}

const Part = ({ name, exercises }) => 
  <p>
    {name} {exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)}
  </>

const Course = ({ course }) => {
    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )   
}

export default Course