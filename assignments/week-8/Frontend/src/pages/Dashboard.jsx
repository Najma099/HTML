import React from 'react';
import UserDetails from '../Components/UserDetails.jsx';
import Contact from '../Components/Contacts.jsx';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div className='font-serif'>
      <header className='bg-cyan-600 text-white p-2 pl-5 text-2xl'>Pay.</header>
      <section className='m-4 p-12'>
        <UserDetails />
        <Link to="/transactions">
          <button className='p-2 bg-blue-300'>View Transactions</button>
        </Link>
        <Contact />
      </section>
    </div>
  );
}

export default Dashboard;
