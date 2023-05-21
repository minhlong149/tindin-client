import React from 'react';
import { Button } from '@mui/material';

function Home({ logout }) {
  return (
    <section>
      <Button variant='contained' onClick={logout}>
        Logout
      </Button>
    </section>
  );
}

export default Home;
