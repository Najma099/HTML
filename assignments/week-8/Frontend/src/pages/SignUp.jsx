import React, { useState } from 'react';
import InputField from '../Components/InputFeild';
import UsernameField from '../Components/UsernameField';
import signUp from "../assets/signinn.jpg";
import Signin from './Signin';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleUsernameValid = (value) => {
    document.querySelector("input[name='username']").value = value;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
    const username = form.get("username");
    const password = form.get("password");
    const firstName = form.get("firstName");
    const lastName = form.get("lastName");

    if (!username || !password || !firstName || !lastName) {
      setError("All fields are required");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5001/api/v1/user/signUp", {
        username,
        password,
        firstName,
        lastName
      });
      console.log(res);
      navigate('/signUpSuccess');
    } catch (err) {
      console.log(err);
      setError("Signup failed");
    }
  };

  return (
    <div className="signup-container flex items-center justify-center min-h-screen font-serif">
      <img src={signUp} alt="Sign Up" className='h-[720px] w-[500px]' />

      <form onSubmit={handleSubmit} className="p-6 w-full max-w-md">
        <h2 className='text-4xl text-sky-600 text-center mb-4'>Sign Up</h2>

        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

        <UsernameField onvalidUsername={handleUsernameValid} />

        <InputField
          type="password"
          placeholder="Enter Password"
          name="password"
        />

        <InputField
          type="text"
          placeholder="First Name"
          name="firstName"
        />

        <InputField
          type="text"
          placeholder="Last Name"
          name="lastName"
        />

        <button
          type="submit"
          className='border border-blue-400 bg-sky-500 p-2 w-full rounded-sm text-white mt-4 transition duration-200 shadow'
        >
          Sign Up
        </button>

        <button
          type="button"
          className='border border-sky-500 p-2 w-full rounded-sm text-gray-400 mt-2 underline  hover:text-sky-600'
          onClick={() => {
            navigate('/Signin')
          }}
        >
         Already have an account? Sign In
        </button>
      </form>
    </div>
  );
};

export default SignUp;
