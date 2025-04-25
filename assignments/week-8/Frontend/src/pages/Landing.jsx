import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600 flex flex-col items-center justify-center text-white">
      <h1 className="text-4xl font-bold mb-4">Welcome to Our App!</h1>
      <p className="text-xl mb-8">Explore the app and get started!</p>
      
      <div className="flex space-x-4">
        <Link to="/signup">
          <button className="px-6 py-3 bg-purple-700 hover:bg-purple-800 text-white font-semibold rounded-lg shadow-lg transition duration-300">
            Sign Up
          </button>
        </Link>
        <Link to="/signin">
          <button className="px-6 py-3 bg-indigo-700 hover:bg-indigo-800 text-white font-semibold rounded-lg shadow-lg transition duration-300">
            Sign In
          </button>
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
