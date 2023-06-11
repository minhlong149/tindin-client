import React, { useContext, useEffect, useState } from 'react';

import Grid from '@mui/material/Grid';

import UserContext from '../../App.jsx';
import RecruiterService from '../../services/recruiter.js';
import { JobsSideBar } from './Jobs/JobsSideBar.jsx';
import { SelectedJob } from './Jobs/SelectedJob.jsx';

export default function Jobs() {
  const user = useContext(UserContext);

  const [status, setStatus] = useState('Loading');
  const [jobs, setJobs] = useState([]);
  const [jobIndex, setJobIndex] = useState(-1);

  const getJobsByRecruiter = async () => {
    try {
      const jobs = await RecruiterService.getJobsByRecruiter(user?.id || 5);
      setJobs(jobs);
      setJobIndex(0);
      setStatus('Success')
    } catch (error) {
      console.log(error.message);
      setStatus('Error');
    }
  };

  useEffect(() => {
    getJobsByRecruiter();
  }, []);

  useEffect(() => {
    console.log(jobs);
  }, [jobs]);

  return status !== 'Success' ? (
    <p>{status}</p>
  ) : (
    <>
    {/* Navigation bar */}
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <JobsSideBar jobs={jobs} setJobIndex={setJobIndex} />
        </Grid>
        <Grid item xs={9}>
          <SelectedJob job={jobs[jobIndex]} />
        </Grid>
      </Grid>
    </>
  );
}
