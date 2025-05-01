import React, { useState, useCallback } from 'react';
import debounce from 'lodash/debounce';
import axios from 'axios';
import { z } from 'zod';

const UsernameField = ({ onvalidUsername }) => {
  const [username, setUsername] = useState("");
  const [status, setStatus] = useState("");
  
  const checkUsername = async (value) => {
    setStatus("checking....");
    try {
      const response = await axios.post("/api/v1/user/check-username", {
        username: value,
      });

      if (response.status === 200) {
        setUsername(value);
        onvalidUsername(value);
        setStatus("Username is Available");
      } else {
        onvalidUsername("");
        setStatus("Username already taken.");
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        setStatus(err.errors[0].message);
      } else if (err.response) {
        setStatus(err.response.data.message);
        onvalidUsername("");
      } else {
        setStatus("An error occurred, please try again.");
      }
    }
  };

  const debounceCheck = useCallback(
    debounce((value) => checkUsername(value), 800),
      []
  ); 

  const handleChange = (e) => {
    const value = e.target.value;
    setUsername(value);
    debounceCheck(value);
  };

  return (
    <div>
      <input
        type="text"
        name="username"
        placeholder="Enter your email" 
        value={username}
        onChange={handleChange}
        className='border-2 bg-gray-100 border-gray-200 rounded-md p-2 w-100 text-grey-400 mb-3'
      />
      <p>{status}</p>
    </div>
  );
};

export default UsernameField;
