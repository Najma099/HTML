import { useState } from 'react'
import './App.css'

function App() {
  const [todo, setTodo] = useState([]);
 return(
   <>
     <CreateTodo tod={todo} setTodo={setTodo}></CreateTodo>
     <Todo todo={todo}></Todo>
   </>
 )
}
export default App
