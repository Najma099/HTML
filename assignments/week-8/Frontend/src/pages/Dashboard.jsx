import React from 'react';
import UserDetails from '../Components/UserDetails.jsx';
import Contact from '../Components/Contacts.jsx';
function Dashboard() {
  return (
      <>
        <header>Pay.</header>
        <UserDetails></UserDetails>
        <Contact></Contact>
      </>  
    );
}
export default Dashboard;