import { Typography } from '@mui/material';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Jobs from './Jobs.jsx';
import CreateJobs from './CreateJobs.jsx';
import EditJob from './EditJob.jsx';

function Recruiter() {
  return (
    <>
      <Typography variant='h1'>Recruiter</Typography>
      <Routes>
        {/* Recruiter home page, list of created jobs */}
        <Route path='/' element={<Jobs />} />

        {/* Create a new job */}
        <Route path='/jobs/create' element={<CreateJobs />} />

        {/* View job description and candidates applied */}
        {/* <Route path='/jobs/:jobId' element={<Job />} /> */}

        {/* Edit job description */}
        <Route path='/jobs/:jobId/edit' element={<EditJob />} />

        {/* View list of candidates, to find a candidate */}
        {/* <Route path='/candidates' element={<Candidates />} /> */}

        {/* View candidate profile */}
        {/* <Route path='/candidates/:candidateUsername' element={<Candidate />} /> */}

        {/* View & Update recruiter profile, including organization details */}
        {/* <Route path='/:username' element={<Profile />} /> */}
      </Routes>
    </>
  );
}

export default Recruiter;
