import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import LandingPage from "./pages/Landing.jsx";
import SignUp from './pages/SignUp.jsx';
import SignIn from './pages/Signin.jsx';
import SignUpSuccess from './pages/SignUpSuccess.jsx';
import Dashboard from './pages/Dashboard.jsx';
import TransactionHistory from './Components/Transaction.jsx';

function App() {
  return (
    <RecoilRoot>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signUp" element={<SignUp/>} />
          <Route path="/signin" element={<SignIn/>} />
          <Route path="/signUpSuccess" element={<SignUpSuccess/>} />
          <Route path="/dashboard" element={<Dashboard/>}></Route>
          <Route path="/transactions" element={<TransactionHistory />} />
        </Routes>
      </Router>
    </RecoilRoot>
  );
}

export default App;
