import React, { useEffect, useState } from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import JobService from '../../../services/job.js';
import { ListItemButton } from '@mui/material';
import { Link } from 'react-router-dom';

export function AppliedCandidates({ jobId }) {
  const [candidatesStatus, setCandidatesStatus] = useState('Loading');
  const [candidates, setCandidates] = useState([]);

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
    getCandidatesByJob(jobId);
  }, []);

  useEffect(() => {
    console.log(candidates);
  }, [candidates]);

  return candidatesStatus !== 'Success' ? (
    <Typography variant='h6' component='div'>
      {candidatesStatus}
    </Typography>
  ) : (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {candidates.map((candidate) => (
        <ListItem alignItems='flex-start'>
          <ListItemButton
          // as={Link} to={`/candidate/${candidate.id}`}
          >
            <ListItemAvatar>
              <Avatar
                alt={`${candidate.user.firstName} ${candidate.user.lastName}`}
                src={candidate.user.profileUrl}
              />
            </ListItemAvatar>
            <ListItemText
              primary={`${candidate.user.firstName} ${candidate.user.lastName}`}
              secondary={
                <Typography
                  sx={{ display: 'inline' }}
                  component='span'
                  variant='body2'
                  color='text.primary'
                >
                  {`${candidate.experienceLevel} ${candidate.title}`}
                </Typography>
              }
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
