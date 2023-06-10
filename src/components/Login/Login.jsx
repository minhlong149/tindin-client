import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import './Login.css';

const Login = ({ updateUser }) => {
  const [hasAccount, setHasAccount] = useState(true);
  const updateFormState = () => {
    setHasAccount(!hasAccount);
    console.log(`Switch to ${hasAccount ? 'register' : 'sign in'} component`);
  };

  return (
    <div className='fullcontent'>
      <div className='headings'>
        <h1>Tindin</h1>
        <h2>Tindin helps you connect with your opportunities and success in your life.</h2>
      </div>

      <div className='form-container'>
        {hasAccount ? (
          <LoginForm switchForm={updateFormState} updateUser={updateUser} />
        ) : (
          <SignupForm switchForm={updateFormState} updateUser={updateUser} />
        )}
      </div>
    </div>
  );
};

export default Login;