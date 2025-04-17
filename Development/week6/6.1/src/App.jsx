import { useState } from 'react'
import './App.css'
import { Header } from './component/header.jsx'

function App() {
  return(
    <>
      <HeaderButton/>
      <Header title="kiiii"></Header>
      <Header title="hiii"></Header>
    </>
  )
}

function HeaderButton() {
  const [header, setHeader] = useState("My name is Najma");
  
  function change() {
    setHeader(`My name is ${Math.random()}`);
  }
  return(
    <>
      <button onClick={change}>Click Here to change the name</button>
      <Header title={header}></Header>
    </>
  )
}
export default App
