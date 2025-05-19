import React, { useEffect, useState } from "react";
import axios from "axios";
import UserCard from "./UserCard";

function Contact() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5001/api/v1/account/contact?search=${search}`,
          { withCredentials: true }
        );

        console.log("res.data:", res.data);

        const userList = res.data.users || res.data; 
        if (!Array.isArray(userList) || userList.length === 0) {
          setMessage("No user exists");
          setUsers([]);
        } else {
          setUsers(userList);
          setMessage("");
        }
      } catch (err) {
        console.error("Error fetching data", err);
        setMessage("Something went wrong");
        setUsers([]);
      }
    };

    fetchData();
  }, [search]);

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search user..."
        className="border-2 bg-gray-100 border-gray-300 rounded-md p-2 w-full text-gray-800 mt-4 mb-4 "
      />

      {message && <p>{message}</p>}

      <ul>
        {users.map((user) => (
          <UserCard key={user._id} user={user} />
        ))}
      </ul>
    </div>
  );
}

export default Contact;
