import React, { useEffect, useState } from 'react';

import List from '@mui/material/List';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import JobService from '../../../services/job.js';
import { CandidateSmall } from './CandidateSmall.jsx';

export function AppliedCandidates({ jobId }) {
  const [candidatesStatus, setCandidatesStatus] = useState('Loading');
  const [candidates, setCandidates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const candidatesFiltered =
    searchTerm !== ''
      ? candidates.filter((candidate) => JSON.stringify(candidate).includes(searchTerm))
      : candidates;

  const getCandidatesByJob = async (jobId) => {
    try {
      const candidates = await JobService.getCandidatesByJob(jobId);
      setCandidates(candidates);
      setCandidatesStatus('Success');
    } catch (error) {
      console.log(error.message);
      setCandidatesStatus('Error');
    }
  };

  useEffect(() => {
    setCandidatesStatus('Loading');
    getCandidatesByJob(jobId);
  }, [jobId]);

  useEffect(() => {
    console.log(candidates);
  }, [candidates]);

  if (candidatesStatus !== 'Success') {
    return (
      <Typography variant='h6' component='div'>
        {candidatesStatus}
      </Typography>
    );
  }

  if (candidates.length === 0) {
    return (
      <Typography variant='h6' component='div'>
        No candidates applied yet
      </Typography>
    );
  }

  return (
    <>
      <TextField
        label='Search'
        helperText='Title, locations, skills,...'
        variant='outlined'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ width: '100%', bgcolor: 'background.paper' }}
      />

      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {candidatesFiltered.map((candidate) => (
          <CandidateSmall candidate={candidate} />
        ))}
      </List>
    </>
  );
}
