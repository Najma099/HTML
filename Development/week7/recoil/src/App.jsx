import React, { memo } from 'react';
import './App.css';
import { RecoilRoot, useRecoilValue,useSetRecoilState } from 'recoil';
import { countAtom } from './store/atoms/count';

function App() {
  console.log("App")
  return(
      <RecoilRoot>
        <Count ></Count>
      </RecoilRoot>
  );
}

function Count() {
  console.log("Count")
  return(
    <div>
      <Countrender ></Countrender>
      <Buttons ></Buttons>
    </div>
  );
}

function Countrender() {
  const count = useRecoilValue(countAtom)
  return(
    <div>
      {count}
    </div>
  );
}

// Import memo from React
const Buttons = memo(() => {
  const setCount = useSetRecoilState(countAtom);
  return(
    <>
      <button onClick={() => {
           setCount(count => count + 1)
         }}>Increase</button>
     
         <button onClick={() => {
           setCount(count => count - 1)
         }}>Decrease</button>
    </>
  );
});

export default App;
