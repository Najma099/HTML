import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [btn, setBtn] = useState(null);

  function change(id) {
    setBtn(id);
  }

  return (
    <>
      <button onClick={() => change(1)}>1</button>
      <button onClick={() => change(2)}>2</button>
      <button onClick={() => change(3)}>3</button>
      <Todo id={btn} />
    </>
  );
}

function Todo({ id }) {
  const [todo, setTodo] = useState(null);

  useEffect(() => {
    if (id === null) return; 
    axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then((response) => {
        setTodo(response.data);
      });
  }, [id]);

  if (!id) return <p>Click a button to load a todo! 🔘</p>;
  if (!todo) return <p>Loading todo...</p>;

  return (
    <>
      <h2>Todo for ID: {id}</h2>
      <p><strong>{todo.title}</strong></p>
      <button>
        {todo.completed ? "Completed ✅" : "Not completed ❌"}
      </button>
    </>
  );
}

export default App;
