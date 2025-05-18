import React, { useState } from "react";
import axios from "axios";
import {Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useSetRecoilState } from "recoil";
import { balanceAtom } from "../store/balance.atom";

function UserCard({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [msg, setMsg] = useState("");
  const setBalance = useSetRecoilState(balanceAtom);
  
  const handleTransaction = async () => {
    console.log("This is getting called");
    const parsedAmount = Number(amount);
    if (Number.isNaN(parsedAmount) || parsedAmount <= 0) {
      setMsg("Please enter a valid number!");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5001/api/v1/account/transfer",
        {
          toUserId: user._id,
          amount: parsedAmount,
        },
        {
          withCredentials: true,
        }
      );
      setBalance(res.data.remainingBalance);
      setMsg(res.data.message + ` Remaining Balance: ₹${res.data.remainingBalance}`);
      setAmount("");
    } catch (err) {
      console.log(err);
      setMsg(err.response?.data?.message || "Transfer failed.");
    }
  };

  return (
    <>
      <div className="border p-4 rounded shadow-md mb-4">
        <div>👤</div>
        <div className="flex gap-2 font-semibold">
          <h3>{user.firstName}</h3>
          <h3>{user.lastName}</h3>
        </div>
        <h4 className="text-gray-600">{user.username}</h4>

        <button
          className="mt-3 px-4 py-1 bg-blue-500 text-white rounded"
          onClick={() => {
            setMsg("");
            setIsOpen(true);
          }}
        >
          Send Money
        </button>
      </div>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="relative bg-white p-6 rounded max-w-sm w-full shadow-lg">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-black text-xl"
            >
              ×
            </button>

            <DialogTitle className="text-lg font-bold mb-4">
              Send Money to {user.username}
            </DialogTitle>

            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full border px-3 py-2 rounded mb-3"
            />

            {msg && <p className="text-sm text-center text-gray-700 mb-2">{msg}</p>}

            <div className="flex justify-end gap-2">
              <button
                className="px-3 py-1 bg-gray-300 rounded"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-1 bg-green-500 text-white rounded"
                onClick={handleTransaction}
              >
                Send
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}

export default UserCard;
