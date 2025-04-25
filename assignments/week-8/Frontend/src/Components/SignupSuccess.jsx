import { useState } from 'react';
import { Check } from 'lucide-react';

export default function SignupSuccess() {
  const [isRedirecting, setIsRedirecting] = useState(false);
  
  const handleContinue = () => {
    // Set redirecting state (could add visual feedback here)
    setIsRedirecting(true);
    // Redirect to dashboard
    window.location.href = '/dashboard';
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="p-8 bg-white rounded-lg shadow-lg text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="relative rounded-full bg-green-100 p-4 animate-pulse">
            {/* Check icon with continuous bounce effect */}
            <div className="text-green-500 animate-bounce">
              <Check size={48} strokeWidth={3} />
            </div>
            {/* Circular animation */}
            <div className="absolute inset-0 rounded-full border-4 border-green-500 opacity-25"></div>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Sign Up Successful!</h2>
        <p className="text-gray-600 mb-6">Your account has been created successfully.</p>
        
        <button 
          className={`px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors ${isRedirecting ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handleContinue}
          disabled={isRedirecting}
        >
          {isRedirecting ? 'Redirecting...' : 'Continue to Dashboard'}
        </button>
      </div>
    </div>
  );
}