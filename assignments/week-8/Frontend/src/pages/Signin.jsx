import React from 'react';
import InputField from '../Components/InputFeild';
import signinn from '../assets/Login.jpg'
import SignUp from './SignUp';
import { Link } from 'react-router-dom';


function Signin() {
  return (
    <div className='flex justify-center text-center items-center min-h-screen font-serif'>
      <img src={signinn} className='w-1/2'></img>
      <form className='p-6 w-full max-w-md '>
        <h1 className='text-4xl text-sky-600 text-center mb-4'>Sign In </h1>
        < InputField 
          type="text"
          placeholder="Enter email"
          name="username"
        />
        < InputField 
          type="password"
          placeholder="Enter password"
          name="password"
        />
        <button
          className='border border-blue-400 bg-sky-500 p-2 w-full rounded-sm text-white mt-4 transition duration-200 shadow'
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