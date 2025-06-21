import TransactionHistory from "./Transaction";
import { RecoilRoot } from "recoil";
import React from 'react';

function App() {
  return(
    <RecoilRoot>
     <TransactionHistory></TransactionHistory>
    </RecoilRoot>
  )
}


export default App;