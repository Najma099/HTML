import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

function UserDetails() {
  const [username, setusername] = useState("");
  const [balance, setBalance] = useState("");
  
  useEffect(()=> {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/v1/account/balance");
        setusername(response.data.username);
        setBalance(response.data.balance);
      }
      catch(err) {
        console.log("Failed to load username and balance", err);
      }
    }  
    fetchData();
  }, [])
  return(
    <div className="flex">
      <h3>{ username}:</h3>
      <h3>{ balance}</h3>
    </div>
  )
}
export default UserDetails;