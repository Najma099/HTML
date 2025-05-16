import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { balanceSelector } from "../store/balance.atom";

function UserDetails() {
  const balance = useRecoilValue(balanceSelector);
  const [userDetails, setUserDetails] = useState({
    username: "",
    firstName: "",
    lastName: ""
  });

  useEffect(() => {
    let isMounted = true;

    const fetchBalance = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/v1/account/balance", {
          withCredentials: true,
        });

        if (isMounted) {
          setUserDetails({
            username: res.data.username,
            firstName: res.data.firstName,
            lastName: res.data.lastName,
          });
        }

      } catch (err) {
        console.log("Error fetching user Details", err);
      }
    };

    fetchBalance();

    return () => {
      isMounted = false;
    };
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
