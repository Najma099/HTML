import React, { useState } from "react";
import axios from "axios";

function UserCard({ user }) {
  const [amount, setAmount] = useState("");
  const [msg, setMsg] = useState("");

  const handleTransaction = async () => {
    const parsedAmount = Number(amount);
    if (Number.isNaN(parsedAmount) || parsedAmount <= 0) {
      setMsg("Please enter a valid number!");
      return;
    }

    try {
      const res = await axios.post(
        "/api/v1/transaction/transfer",
        {
          toUserId: user._id,
          amount: parsedAmount,
        },
        {
          withCredentials: true
        }
      );

      setMsg(res.data.message + ` Remaining Balance: ₹${res.data.remainingBalance}`);
      setAmount("");
    } catch (err) {
      setMsg(err.response?.data?.message || "Transfer failed.");
    }
  };

  return (
    <>
      <div>
        <div>Icon</div>
        <div className="flex">
          <h3>{user.firstName}</h3>
          <h3>{user.lastName}</h3>
        </div>
        <h4>{user.username}</h4>
      </div>

      <div>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
        />
        <button onClick={handleTransaction}>Send Money</button>
      </div>

      {msg && <p>{msg}</p>}
    </>
  );
}

export default UserCard;
