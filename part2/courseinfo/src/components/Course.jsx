const Header = ({ name }) => <h1>{name}</h1>

// const Total = ({ sum }) => <p>Number of exercises {sum}</p>

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
            {/* <Total sum={course.parts[0].exercises + parts[1].exercises + parts[2].exercises} /> */}
        </div>
    )   
}

export default Course