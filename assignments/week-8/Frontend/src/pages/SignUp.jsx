import React, { useState } from 'react';
import InputField from '../Components/InputFeild';
import UsernameField from '../Components/UsernameField';
import signUp from "../assets/signinn.jpg";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUsernameValid = (value) => {
    setFormData(prev => ({ ...prev, username: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, password, firstName, lastName } = formData;
    if (!username || !password || !firstName || !lastName) {
      alert("Please fill all the fields.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("/api/v1/user/signup", formData);
      alert("Signup successful!");
      console.log(res.data);
      navigate("/login");
    } catch (err) {
      alert("Signup failed. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container flex items-center justify-center min-h-screen font-serif">
      <img src={signUp} alt="Sign Up" className='h-[720px] w-[500px]' />

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6 shadow-md rounded-md">
        <h2 className='text-4xl text-sky-600 text-center mb-3'>Sign Up</h2>

        <UsernameField onvalidUsername={handleUsernameValid} />

        <InputField
          type="password"
          placeholder="Enter Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />

        <InputField
          type="text"
          placeholder="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />

        <InputField
          type="text"
          placeholder="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />

        <button
          type="submit"
          disabled={loading}
          className={`border-1 border-blue-400 bg-sky-500 p-2 rounded-sm text-white transition-all duration-200 shadow ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>

        <a
          href="/login"
          className='border-1 border-sky-500 p-2 rounded-sm text-gray-400 text-center hover:underline'
        >
          Already have an account? Sign In
        </a>
      </form>
    </div>
  );
};

export default SignUp;
