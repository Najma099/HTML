import React from "react";
import { useState } from 'react';


export default function SignUpSuccess() {
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleContinue = () => {
    setIsRedirecting(true);
    window.location.href = '/signin';
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 font-serif">
      <div className="p-8 text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="relative rounded-full bg-green-100 p-4">
            <svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="green"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="checkmark"
            >
              <path d="M5 13L9 17L19 7" className="checkmark-path" />
            </svg>
            <div className="absolute inset-0 rounded-full border-4 border-green-500 opacity-25"></div>
          </div>
        </div>

        <h2 className="text-2xl font-normal text-gray-800 mb-2">Sign Up Successful!</h2>
        <p className="text-gray-400 mb-6">Your account has been created successfully.</p>

        <button
          className={`px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors ${isRedirecting ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handleContinue}
          disabled={isRedirecting}
        >
          {isRedirecting ? 'Redirecting...' : 'Continue to Sign In'}
        </button>
      </div>
    </div>
  );
}



