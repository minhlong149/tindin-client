import React from 'react';
import { useNavigate } from 'react-router-dom';

import EditIcon from '@mui/icons-material/Edit';
import Fab from '@mui/material/Fab';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export function JobInfo({ job }) {
  const navigate = useNavigate();
  const editJob = () => navigate(`/jobs/${job.id}/edit`);

  return (
    <>
      <Stack direction='row' alignItems='center' justifyContent='space-between'>
        <Typography variant='h5' component='div'>
          {job.title}
        </Typography>
        <Fab color='primary' size='medium' onClick={editJob}>
          <EditIcon />
        </Fab>
      </Stack>

      {job.recruiter.organization.location && (
        <Typography variant='body2'>Location: {job.recruiter.organization.location}</Typography>
      )}

      {job.requireExperienceLevels.length > 0 && (
        <Typography variant='body2'>
          Experience Levels: {job.requireExperienceLevels.join(', ')}
        </Typography>
      )}

      {job.requireSkills.length > 0 && (
        <Typography variant='body2'>
          Skills: {job.requireSkills.map(({ skill }) => skill).join(', ')}
        </Typography>
      )}
    </>
  );
}
