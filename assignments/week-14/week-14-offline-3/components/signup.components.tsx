"use client"
import {useState} from 'react'
import {useRouter} from 'next/navigation'
import {solve} from '../app/action/user'

export default function Signup() {
    const[email, setemail] = useState("");
    const[password, setpassword] = useState("");
    const router = useRouter();

    async function senddata() {
        try{
            solve(email,password);
            router.push('/')
        }
        catch(err) {
            console.log("signUp failed...")
        }
    }

   return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm space-y-4">
      <h2 className="text-2xl font-bold text-center text-gray-800">Sign Up</h2>

      <input
        type="text"
        value={email}
        onChange={(e) => setemail(e.target.value)}
        placeholder="Username"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 text-gray-500 focus:ring-blue-500"
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setpassword(e.target.value)}
        placeholder="Password"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 text-gray-500 focus:ring-blue-500"
      />

      <button
        onClick={senddata}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Sign Up
      </button>
    </div>
  </div>
);

}