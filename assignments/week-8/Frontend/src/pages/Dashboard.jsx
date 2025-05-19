import React from 'react';
import UserDetails from '../Components/UserDetails.jsx';
import Contact from '../Components/Contacts.jsx';

function Dashboard() {
  return (
    <div className='font-serif'>
      <header className='bg-cyan-600 text-white p-2 pl-5 text-2xl'>Pay.</header>
      <section className='m-4 p-12'>
        <UserDetails />
        <Contact />
      </section>
    </div>
  );
}

export default Dashboard;
