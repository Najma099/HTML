import React from 'react';
import './App.css';
import { RecoilRoot, useRecoilValue,useSetRecoilState } from 'recoil';
import { countAtom, evenSelector } from './store/atoms/count.js';


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
      <Msg></Msg>
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

const Buttons = () => {
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
};

const Msg = () => {
  const isEven = useRecoilValue(evenSelector);
  return(
    <div>
      {isEven ? "It is even" : "It is odd"};
    </div>
  )
}

export default App;
