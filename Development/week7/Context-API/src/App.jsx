import React, { memo, useState } from 'react';
import './App.css';
import { CountContext } from './context';
import { useContext } from 'react';

function App() {
  const [count, setCount] = useState(0);
  console.log('App rendered');
  return(
    <div>
      <CountContext.Provider value={{ count, setCount }}>
        <Count ></Count>
      </CountContext.Provider>
    </div>
  );
}

function Count() {
  console.log('Count re-rendered');
  return(
    <div>
      <Countrender ></Countrender>
      <Buttons ></Buttons>
    </div>
  );
}

function Countrender() {
  const { count } = useContext(CountContext);
  return(
    <div>
      {count}
    </div>
  );
}

// Import memo from React
const Buttons = memo(() => {
  const { setCount } = useContext(CountContext)
  return(
    <>
      <button onClick={() => setCount((prev) => prev + 1)}>Increment</button>
      <button onClick={() => setCount((prev) => prev - 1)}>Decrement</button>
    </>
  );
});

export default App;
