import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import LandingPage from "./pages/Landing";
// import SignUpPage from "./pages/SignUp";
// import SigninPage from "./pages/Signin";

function App() {
  return (
    <RecoilRoot>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/* <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SigninPage />} /> */}
        </Routes>
      </Router>
    </RecoilRoot>
  );
}

export default App;
