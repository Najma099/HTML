//without memo

import { useState } from "react";

function App() {
  const [number, setNumber] = useState(1);
  const [count, setCount] = useState(0);

  function slowFibonacci(n) {
    console.log("Calculating Fibonacci...");
    if (n <= 1) return n;
    return slowFibonacci(n - 1) + slowFibonacci(n - 2);
  }

  const fib = slowFibonacci(number);
  
  //with memo
  // const fib = useMemo(() => {
  //    console.log("Calculating Fibonacci...");
  //    return slowFibonacci(number);
  //  }, [number]);
 
  //  function slowFibonacci(n) {
  //    if (n <= 1) return n;
  //    return slowFibonacci(n - 1) + slowFibonacci(n - 2);
  //  }


  return (
    <>
      <h2>Fibonacci Calculator</h2>
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(parseInt(e.target.value))}
        min={0}
      />
      <p>Fibonacci of {number}: {fib}</p>

      <button onClick={() => setCount((prev) => prev + 1)}>
        Increment Counter ({count})
      </button>
    </>
  );
}

export default App;
