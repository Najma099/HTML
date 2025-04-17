
import { useState } from "react";

export function CreateTodo({ setTodo, todo }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  async function AddTodo() {
    const newTodo = { title, description };

    try {
      const res = await fetch("http://localhost:3000/addTodo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      });

      const data = await res.json();
      if (data.ok) {
        setTodo([...todo, newTodo]);
        setTitle("");
        setDescription("");
      } else {
        alert(data.message || "Failed to add todo");
      }
    } catch (err) {
      console.error("Error adding todo:", err);
    }
  }

  return (
    <>
      <input
        type="text"
        placeholder="Please enter the title"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <input
        type="text"
        placeholder="Please enter the description"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      />
      <button onClick={AddTodo}>Add Todo</button>
    </>
  );
}
