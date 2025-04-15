import { useState } from 'react';
import './App.css';


function App() {
  const [todo, setTodo] = useState([]);
  const [newtodo, setnewtodo] = useState("");
  function addTodo() {
    setTodo([...todo, newtodo]);
    setnewtodo("");
  }
  return(
    <>
      <input type="text" placeholder="Please Enter the todo" onChange={(e) => setnewtodo(e.target.value)} value={newtodo}></input>
      <button onClick={addTodo }>Add Todo</button>
      <div>
        {
          todo.map((item, index) => {
            return <div key={index}> { item}</div>
          })
        }
      </div>
    </>
  )
}

export default App;
