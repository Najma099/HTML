import { useState } from 'react';
import './App.css';


function App() {
  const salam = 'Assamualaikum';
  const [message, setMessage] = useState(salam)
  function toggle() {
    setMessage( prev=> prev === salam ? "walaikum Assalam": salam)
  }
  return(
    <>
      <button onClick={toggle}> { message} </button>
    </>
  )
}

export default App;
