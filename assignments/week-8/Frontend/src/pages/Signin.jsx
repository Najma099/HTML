import React from 'react';

function Signin() {
  return (
    <div>
      <h1>Sign In Page</h1>
      < InputField 
        type="text"
        label="Please Enter your email"
        name="username"
      />
      < InputField 
        type="password"
        label="Please Enter your password"
        name="password"
      />
    </div>
  );
}

export default Signin;