import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Job from './Job.jsx';
import Jobs from './Jobs.jsx';
import NavBar from './NavBar.jsx';
import Search from './Search.jsx';

import Organization from '../Organization/Organization.jsx';
import Profile from './Profile.jsx';


function Candidate() {
  return (
    <>
      <NavBar />

      {/* <Typography variant='h1'>Candidate</Typography> */}
      <Routes>
        {/* Candidate home page, list of jobs */}
        <Route path='/' element={<Jobs />} />

        {/* View details of a job & apply */}
        <Route path='/jobs/:jobId' element={<Job />} />

        {/* View saved jobs */}
        {/* <Route path='/jobs/saved' element={<SavedJobs />} /> */}

        {/* View organization details */}
        <Route path='/organizations/:organizationId' element={<Organization />} />

        {/* Search for jobs and organizations */}
        <Route path='/search' element={<Search />} />

        {/* View & Update candidate profile */}
        <Route path='/:candidateId' element={<Profile />} />
      </Routes>
    </>
  );
}

export default Candidate;
