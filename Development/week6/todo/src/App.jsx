import { useState, useEffect } from 'react';
import './App.css';
import { CreateTodo } from './component/CreateTodo';
import { Todo } from './component/Todo';

function App() {
  const [todo, setTodo] = useState([]);

  useEffect(() => {
    const initialTodos = [
      { title: "Learn React", description: "Start with components and hooks" },
      { title: "Build Todo App", description: "Use React and Express" },
      { title: "Study Web3", description: "Learn about Ethereum and smart contracts" }
    ];
    setTodo(initialTodos);
  }, []);

  return (
    <>
      <CreateTodo todo={todo} setTodo={setTodo} />
      <Todo todo={todo} setTodo={setTodo} />
    </>
  );
}

export default App;
