import { useState } from "react";

export function CreateTodo({ todo, setTodo }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function change() {
    const newTodo = {
      title,
      description,
      completed: false
    };

    setTodo([...todo, newTodo]);
    setTitle("");
    setDescription("");
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Please Enter Title:"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Please Enter Description:"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={change}>Add the Todo</button>
    </div>
  );
}
