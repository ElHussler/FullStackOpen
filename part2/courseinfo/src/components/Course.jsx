const Header = ({ name }) => <h1>{name}</h1>

const Total = ({ parts }) => {
    const exercises = parts.map(parts => parts.exercises)
    
    let runningTotal = 0
    exercises.forEach(exercise => {runningTotal+=exercise});

    return (
        <p>Number of exercises {runningTotal}</p>
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