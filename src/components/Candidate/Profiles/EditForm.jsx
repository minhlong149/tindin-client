import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React from 'react';

export function EditForm({ updatedApplicant, setUpdatedApplicant, submitChange }) {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 640,
        bgcolor: 'background.paper',
        boxShadow: 24,
        borderRadius: 2,
        p: 4,
      }}
    >
      <Stack direction='column' spacing={2}>
        <Typography variant='h6'>Edit user profile</Typography>

        <Stack
          spacing={2}
          sx={{
            maxHeight: 400,
            overflowY: 'auto',
            paddingY: 2,
            paddingRight: 2,
          }}
        >
          <Stack direction='row' spacing={2}>
            <TextField
              required
              label='First Name'
              value={updatedApplicant.user.firstName ?? ''}
              onChange={(e) => setUpdatedApplicant({
                ...updatedApplicant,
                user: { ...updatedApplicant.user, firstName: e.target.value },
              })}
              fullWidth />
            <TextField
              label='Last Name'
              value={updatedApplicant.user.lastName ?? ''}
              onChange={(e) => setUpdatedApplicant({
                ...updatedApplicant,
                user: { ...updatedApplicant.user, lastName: e.target.value },
              })}
              fullWidth />
          </Stack>

          <Stack direction='row' spacing={2}>
            <TextField
              label='Date of birth'
              type='date'
              value={updatedApplicant.user.dateOfBirth ?? ''}
              onChange={(e) => setUpdatedApplicant({ ...updatedApplicant, dateOfBirth: e.target.value })} // TODO: Fix date format
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth />
            <TextField
              label='Prefered location'
              value={updatedApplicant.preferLocation ?? ''}
              onChange={(e) => setUpdatedApplicant({ ...updatedApplicant, preferLocation: e.target.value })}
              fullWidth />
          </Stack>

          <TextField
            label='Job title'
            value={updatedApplicant.title ?? ''}
            onChange={(e) => setUpdatedApplicant({ ...updatedApplicant, title: e.target.value })}
            fullWidth />
          <TextField
            label='Email'
            value={updatedApplicant.user.email ?? ''}
            onChange={(e) => setUpdatedApplicant({
              ...updatedApplicant,
              user: { ...updatedApplicant.user, email: e.target.value },
            })}
            fullWidth />
          <TextField
            label='Phone'
            value={updatedApplicant.user.phone ?? ''}
            onChange={(e) => setUpdatedApplicant({
              ...updatedApplicant,
              user: { ...updatedApplicant.user, phone: e.target.value },
            })}
            fullWidth />
          <TextField
            label='Website'
            value={updatedApplicant.user.website ?? ''}
            onChange={(e) => setUpdatedApplicant({
              ...updatedApplicant,
              user: { ...updatedApplicant.user, website: e.target.value },
            })}
            fullWidth />
          {/* TODO: Add username and password */}
        </Stack>

        <Stack direction='row' justifyContent='flex-end'>
          <Button variant='contained' color='primary' onClick={submitChange}>
            Save
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
