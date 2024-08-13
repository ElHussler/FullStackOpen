import Todo from './Todo'

const TodoList = ({ todos, deleteTodo, completeTodo }) => (
  <>
    {todos.map(todo => (
      <div key={todo._id}>
        <Todo todo={todo} deleteTodo={deleteTodo} completeTodo={completeTodo} />
      </div>
    )).reduce((acc, cur) => [...acc, <hr />, cur], [])}
  </>
)

export default TodoList
