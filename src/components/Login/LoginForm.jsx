import { Button } from '@mui/material';
import React from 'react';

export function LoginForm({ login }) {
  const handleLogin = () => {
    const credential = getCredentialsFromForm();
    login(credential);
  };

  const getCredentialsFromForm = () => {};

  return (
    <section>
      <Button variant='contained' onClick={handleLogin}>
        Login
      </Button>
    </section>
  );
}
