import {useState} from "react"
export function CreateTodo(todo, setTodo) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  
  function change() {
    const newtodo = ({
      title,
      description
    })
    setTodo(...todo, newtodo);
    setTitle("");
    setDescription("");
  }
  return(
    <div>
      <input type="text" placeholder="Please Enter Title:" value={title} onChange={ (e) => {
        setTitle(e.target.value)
      }}></input>
      <input type="text" placeholder="Please Enter Descriptions:" value={description} onChange={ (e) => {
        setDescription(e.target.value)
      }}></input>
      <button onClick={change}>Add the Todo</button>
    </div>
  )
}