import React, { useState } from 'react';
import InputField from '../Components/InputField.jsx';
import signinn from '../assets/Login.jpg';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { apiDomain } from '../utils/config.js';

function Signin() {
  const [err, setErr] = useState("")
   const navigate = useNavigate();
  const handleSubmit = async(e) => {
    
    e.preventDefault();
    const form = new FormData(e.target);
    const username = form.get("username");
    const password = form.get("password");
    
    if(!username || !password) {
      setErr("All the fields are required!!");
      return;
    }
    
    try{
      const res = await axios.post(apiDomain + "/api/v1/user/signin",
        {
          username: username,
          password: password
        },
        {
          withCredentials: true
        }
      );
      if(res.data.success == false) {
        setErr(res.data.message || "Invalid credentials");
        return;
      }
      navigate("/dashboard");
    }
    catch(err) {
      console.log(err);
      setErr("Something went wrong. Please try again.");
    }
  }
  return (
    <div className='flex justify-center text-center items-center min-h-screen font-serif'>
      <img src={signinn} className='w-1/2'></img>
      <form onSubmit={handleSubmit} className='p-6 w-full max-w-md '>
        <h1 className='text-4xl text-sky-600 text-center mb-4'>Sign In </h1>
        {err && <p className="text-red-500 text-sm mb-4">{err}</p>}
        < InputField 
          type="text"
          placeholder="Enter email"
          name="username"
          autoComplete="username"
        />
        < InputField 
          type="password"
          placeholder="Enter password"
          name="password"
          autoComplete="current-password"
        />
        <button
          type="submit"
          className='border border-blue-400 bg-sky-500 p-2 w-full rounded-sm text-white mt-4 transition-all duration-300  shadow hover:bg-sky-700'
        >Sign in</button>
        <Link
          to="/SignUp"
          className="block text-center border border-sky-500 p-2 w-full rounded-sm text-gray-400 mt-2 underline hover:text-sky-600"
        >
          Don't have an account? <span>Sign Up</span>
        </Link>
      </form>
    </div>
  );
}

export default Signin;