import { Button } from '@mui/material';
import React from 'react';

export function SignupForm({ signup }) {
  const handleSignup = () => {
    const credential = getCredentialsFromForm();
    signup(credential);
  };

  const getCredentialsFromForm = () => {};

  return (
    <section>
      <Button variant='contained' onClick={handleSignup}>
        Sign up
      </Button>
    </section>
  );
}
