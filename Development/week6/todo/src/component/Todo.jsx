export function Todo({todo}) {
  return(
    <>
      {todo.map((todo, index) => (
        <div key={index}>
          <h2>{todo.title}</h2>
          <h3>{todo.description}</h3>
          <button>
            {todo.completed === true ? "Completed" : "Mark as Complete"}
          </button>
        </div>
      ))}
    </>
  )
}