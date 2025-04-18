export function Todo({ todo, setTodo }) {
  function toggleComplete(index) {
    const updatedTodos = [...todo];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodo(updatedTodos);
  }

  return (
    <>
      {todo.map((todoItem, index) => (
        <div key={index}>
          <h2 style={{ textDecoration: todoItem.completed ? "line-through" : "none" }}>
            {todoItem.title}
          </h2>
          <h3>{todoItem.description}</h3>
          <button onClick={() => toggleComplete(index)}>
            {todoItem.completed ? "Completed" : "Mark as Complete"}
          </button>
        </div>
      ))}
    </>
  );
}
