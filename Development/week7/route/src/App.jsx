import {lazy, Suspense} from 'react';
import { BrowserRouter, Routes, Route, useNavigate} from 'react-router-dom'
const Landing = lazy(() => import('./components/Landing'));
const Dashboard = lazy(() => import('./components/Dashboard'));
import './App.css'


function App() {
  return(
    <>
      <BrowserRouter>
        <Appbar></Appbar>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<Landing />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>  
  )
}

function Appbar() {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <button onClick={() => {
          navigate("/dashboard")
        }}>Dashboard</button>
        <button onClick={() =>
          navigate("/")
        }>Landing</button>
      </div>
    </>
  )
}

export default App
