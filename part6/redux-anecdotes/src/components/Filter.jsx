import { useDispatch } from "react-redux"
import { updateFilter } from "../reducers/filterReducer"

const Filter = () => {
  const dispatch = useDispatch()
  
  const style = {
    marginBottom: 10
  }
  
  return (
    <div style={style}>
      filter
      <input onChange={() => dispatch(updateFilter(event.target.value))} />
    </div>
  )
}

export default Filter