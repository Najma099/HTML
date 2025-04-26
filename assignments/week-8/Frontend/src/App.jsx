import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import LandingPage from "./pages/Landing.jsx";
import SignUp from './pages/SignUp.jsx';
import SignIn from './pages/Signin.jsx';

function App() {
  return (
    <RecoilRoot>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signUp" element={<SignUp/>} />
          <Route path="signin" element={<SignIn/>} />
        </Routes>
      </Router>
    </RecoilRoot>
  );
}

export default App;
