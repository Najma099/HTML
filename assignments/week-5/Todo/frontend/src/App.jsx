
import { useState } from "react";
import './App.css'
import { CreateTodo } from './components/CreateTodo'
import { Todos } from './components/todos'
function App() {
  const [todo, setTodo] = useState([]);
  return(
    <>
      <CreateTodo setTodo={setTodo} todo={todo}></CreateTodo>
      <Todos todos={todo}></Todos>
    </>
  )
}
export default App;