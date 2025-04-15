import { useState } from 'react';
import './App.css';


function App() {
  const [message, setMessage] = useState("");
  function changeMessage(e) {
     setMessage(e.target.value);
  }
  return(
    <>
      <input  onChange={changeMessage} type="text" placeholder="Please Enter your text" value={message}></input>
      <p>{message}</p>
    </>
  )
}

export default App;
