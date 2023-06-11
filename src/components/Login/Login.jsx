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

// import { Button } from '@mui/material';
// import React, { useState } from 'react';

// import loginServices from '../../services/login.js';
// import { LoginForm } from './LoginForm.jsx';
// import { SignupForm } from './SignupForm.jsx';

// function Login({ login }) {
//   const [hasAccount, setHasAccount] = useState(true);
//   const switchLoginForm = () => setHasAccount(!hasAccount);

//   const signup = (credential) => {
//     loginServices.createNewAccount(credential);
//     login(credential);
//   };

//   return (
//     <section>
//       {hasAccount ? <LoginForm login={login} /> : <SignupForm signup={signup} />}
//       <Button variant='outlined' onClick={switchLoginForm}>
//         Switch to {hasAccount ? 'Sign up' : 'Login'} page
//       </Button>
//     </section>
//   );
// }

// export default Login;