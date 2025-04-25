import { useState } from 'react';
import './App.css';

function App() {
  const [num, setNum] = useState(0);
  const [count, setCount] = useState(0);

  function change(val) {
    val = parseInt(val); 
    if (!isNaN(val)) {
      const sum = (val * (val + 1)) / 2;
      setNum(sum);
    }
  }

  function changeCount() {
    setCount((prev) => prev + 1); 
  }

  return (
    <>
      <input
        type="number"
        placeholder="Please enter a number"
        onChange={(e) => {
          change(e.target.value);
        }}
      />
      <p>Calculated Sum: {num}</p>

      <button onClick={changeCount}>Counter: {count}</button>
    </>
  );
}

export default App;
