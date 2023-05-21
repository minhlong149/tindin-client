import { Typography } from '@mui/material';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Jobs from './Jobs.jsx';

function Candidate() {
  return (
    <>
      <Typography variant='h1'>Candidate</Typography>
      <Routes>
        {/* Candidate home page, list of jobs */}
        {/* <Route path='/' element={<Jobs />} /> */}

        {/* View details of a job & apply */}
        {/* <Route path='/jobs/:jobId' element={<Job />} /> */}

        {/* View saved jobs */}
        {/* <Route path='/jobs/saved' element={<SavedJobs />} /> */}

        {/* View organization details */}
        {/* <Route path='/organizations/:organizationId' element={<Organization />} /> */}

        {/* Search for jobs and organizations */}
        {/* <Route path='/search' element={<Search />} /> */}

        {/* View & Update candidate profile */}
        {/* <Route path='/:username' element={<Profile />} /> */}
      </Routes>
    </>
  );
}

export default Candidate;