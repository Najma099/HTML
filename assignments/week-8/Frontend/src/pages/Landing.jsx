import React from 'react';
import { Link } from 'react-router-dom';
import bg from '../assets/bg.png';

function Landing() {
  return (
    <div className='p-3 flex flex-col md:flex-row md:gap-8 items-center justify-center min-h-screen font-serif'>
      <img src={bg} className="h-[500px] w-[600px] object-cover "></img>
      <div className='p-4'>
        <h1 className='mb-4 text-6xl text-cyan-600'>Welcome to our App!</h1>
        <div className='mb-3 text-xl text-gray-500'> Experience fast, easy, and the most secure payments with us.</div>
        <div className='flex items-center justify-center gap-6'>
          <Link to="/signUp"><button className='bg-sky-500 p-2 w-30 rounded-xl transition-all duration-300 cursor-pointer text-white hover:bg-sky-700 shadow-lg'>SignUp</button></Link>
          <Link to="/signin"><button className='bg-sky-500 p-2 w-30 rounded-xl transition-all duration-300 cursor-pointer text-white hover:bg-sky-700 shadow-lg'>SignIn</button></Link>
        </div>
      </div>
    </div>
  );
}

export default Landing;
