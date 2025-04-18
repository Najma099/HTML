import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  return (
    <Todo id={64} />
  );
}

function Todo({ id }) {
  const [todo, setTodo] = useState(null);

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then((response) => {
        setTodo(response.data);
      });
  }, [id]);

  if (!todo) {
    return <p>Loading todo...</p>;
  }

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
