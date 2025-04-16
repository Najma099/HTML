import { useState } from 'react';
import './App.css';

function App() {
  const [todo, Settodo] = useState([]);
  let [newtodo, Setnewtodo] = useState("");
  
  function addTodo() {
    newtodo = newtodo.trim();
    if (newtodo == "") return;
    
    const newItem = {
      id: Date.now(),
      text: newtodo
    };
    
    Settodo([...todo, newItem]);
    Setnewtodo("");
  }
  
  function removeTodo(id) {
    Settodo(
      todo.filter((item) => item.id !== id)
    )
  }
  return(
    <>
      <input type="text" placeholder='Enter your Todo' onChange={(e) => Setnewtodo(e.target.value)} value={newtodo}></input>
      <button onClick={addTodo}>Add Todo</button>
      <div>
        {
          todo.map((item) => {
            return(
              <div key={item.id}>
                <h3>{item.text}</h3>
                <button onClick={() => removeTodo(item.id) }>Remove</button>
              </div>
            )
          })
        }
      </div>
    </>
  )
}



export default App;
