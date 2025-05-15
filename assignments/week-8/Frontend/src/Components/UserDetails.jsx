import React, { useEffect, useState } from "react";
import axios from "axios";

function UserDetails() {
  const [balance, setBalance] = useState("");
  const [userDetails, setUserDetails] = useState({
    username: "",
    firstName: "",
    lastName: ""
  });

  const fetchBalance = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/v1/account/balance", {
        withCredentials: true,
      });
      
      setUserDetails({
        username: res.data.username,
        firstName: res.data.firstName,
        lastName: res.data.lastName,
      });

      setBalance(res.data.balance);
    } catch (err) {
      console.log("Error fetching user balance", err);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <h3><strong>Name:</strong> {userDetails.firstName} {userDetails.lastName}</h3>
      <h3><strong>Username:</strong> {userDetails.username}</h3>
      <h3><strong>Balance:</strong> ₹{balance}</h3>
    </div>
  );
}

export default UserDetails;
