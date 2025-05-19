import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { balanceAtom } from "../store/balance.atom";
import { Link } from "react-router-dom";
import { apiDomain } from "../utils/config";

function UserDetails() {
  const balance = useRecoilValue(balanceAtom);
  const [userDetails, setUserDetails] = useState({
    username: "",
    firstName: "",
    lastName: ""
  });

  useEffect(() => {
    let isMounted = true;

    const fetchBalance = async () => {
      try {
        const res = await axios.get(apiDomain + "/api/v1/account/balance", {
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
      <h3 className="text-2xl mb-0">{userDetails.firstName} {userDetails.lastName}</h3>
      <h3 className="text-gray-500">{userDetails.username}</h3>
      <div className="flex gap-4">
        <h3 className="bg-green-300 rounded-xl p-2 "><strong className="text-green-700">Balance:</strong> ₹{balance}</h3>
        <Link to="/transactions">
          <button className='p-2 bg-blue-300 rounded-xl '>View Transactions</button>
        </Link>
      </div>
    </div>
  );
}

export default UserDetails;
