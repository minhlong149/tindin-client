import { Button } from '@mui/material';
import React, { useState } from 'react';

import loginServices from '../../services/login.js';
import { LoginForm } from './LoginForm.jsx';
import { SignupForm } from './SignupForm.jsx';

function Login({ login }) {
  const [hasAccount, setHasAccount] = useState(true);
  const switchLoginForm = () => setHasAccount(!hasAccount);

  const signup = (credential) => {
    loginServices.createNewAccount(credential);
    login(credential);
  };

  return (
    <section>
      {hasAccount ? <LoginForm login={login} /> : <SignupForm signup={signup} />}
      <Button variant='outlined' onClick={switchLoginForm}>
        Switch to {hasAccount ? 'Sign up' : 'Login'} page
      </Button>
    </section>
  );
}

export default Login;
