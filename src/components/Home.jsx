import React, { useContext } from 'react';
import { Button } from '@mui/material';

import { UserContext } from '../App.jsx';
import Candidate from './Candidate/Candidate.jsx';
import Recruiter from './Recruiter/Recruiter.jsx';

function Home({ logout }) {
  const user = useContext(UserContext);
  return (
    <section>
      {user.user.role === 'CANDIDATE' ? <Candidate /> : <Recruiter />}
      <Button variant='contained' onClick={logout}>
        Logout
      </Button>
    </section>
  );
}

export default Home;
