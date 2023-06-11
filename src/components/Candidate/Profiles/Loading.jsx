import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React from 'react';

export function Loading({ status }) {
  const centered = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };

  if (status === 'Loading') {
    return <CircularProgress style={centered} />;
  }

  return (
    <Stack style={centered}>
      <Typography variant='h6'>Something went wrong :(</Typography>
    </Stack>
  );
}
