import React, { useState, useCallback } from 'react';
import debounce from 'lodash/debounce';
import axios from 'axios';
import { apiDomain } from '../utils/config';

const UsernameField = ({ onvalidUsername }) => {
  const [username, setUsername] = useState("");
  const [status, setStatus] = useState("");
  const [statusColor, setStatusColor] = useState("text-gray-500");

  const checkUsername = async (value) => {
    if (!value.trim()) {
      setStatus("");
      onvalidUsername("");
      return;
    }
    setStatus("Checking...");
    setStatusColor("text-yellow-500");

    try {
      const response = await axios.post(apiDomain + "/api/v1/user/check-username", {
        username: value,
      });
      
      if (response.status === 200) {
        setStatus("Email is available");
        setStatusColor("text-green-600");
        onvalidUsername(value);
      } else {
        setStatus("Email is already taken");
        setStatusColor("text-red-600");
        onvalidUsername("");
      }
    } catch (err) {
      const message = err.response?.data?.message || "Error checking username";
      setStatus(message);
      setStatusColor("text-red-600");
      onvalidUsername("");
    }
  };

  const debounceCheck = useCallback(debounce(checkUsername, 800), []);

  const handleChange = (e) => {
    const value = e.target.value;
    setUsername(value);
    debounceCheck(value);
  };

  return (
    <div className="mb-3">
      <input
        type="text"
        name="username"
        placeholder="Enter your email"
        value={username}
        onChange={handleChange}
        className="border-2 bg-gray-100 border-gray-300 rounded-md p-2 w-full text-gray-800"
      />
      {status && <p className={`text-sm mt-1 ${statusColor}`}>{status}</p>}
    </div>
  );
};

export default UsernameField;
