import EditIcon from '@mui/icons-material/Edit';
import EmailIcon from '@mui/icons-material/Email';
import WebsiteIcon from '@mui/icons-material/Language';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import Avatar from '@mui/material/Avatar';
import Fab from '@mui/material/Fab';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { EditForm } from './EditForm';

export function UserInfo({ applicant, handleSubmit }) {
  const [openProfileModel, setOpenProfileModel] = useState(false);
  const [updatedApplicant, setUpdatedApplicant] = useState(applicant);
  const submitChange = () => {
    handleSubmit(updatedApplicant);
    setOpenProfileModel(false);
  };
  // return <p>ok</p>
  return (
    <>
      <Stack>
        <Avatar
          sx={{ height: '150px', width: '150px' }}
          alt={applicant.user.firstName}
          src={applicant.user.profileUrl}
        />
        <Stack direction='row' spacing={2}>
          <Typography variant='h4'>
            {applicant.user.firstName} {applicant.user.lastName}
          </Typography>
          <Fab color='primary' onClick={() => setOpenProfileModel(true)} size='small'>
            <EditIcon />
          </Fab>
        </Stack>
        <Typography variant='h5'>{applicant.title}</Typography>
      </Stack>
      <Stack direction='row' spacing={4}>
        {applicant.preferLocation && (
          <Stack direction='row' alignItems='center' spacing={2}>
            <LocationOnIcon />
            <Typography variant='body2'>{applicant.preferLocation}</Typography>
          </Stack>
        )}

        {applicant.user.email && (
          <Stack direction='row' alignItems='center' spacing={2}>
            <EmailIcon />
            <Typography variant='body2'>{applicant.user.email}</Typography>
          </Stack>
        )}
        {applicant.user.phone && (
          <Stack direction='row' alignItems='center' spacing={2}>
            <PhoneIcon />
            <Typography variant='body2'>{applicant.user.phone}</Typography>
          </Stack>
        )}
        {applicant.user.website && (
          <Stack direction='row' alignItems='center' spacing={2}>
            <WebsiteIcon />
            <Link to={applicant.user.website}>
              <Typography variant='body2'>{applicant.user.website}</Typography>
            </Link>
          </Stack>
        )}
      </Stack>
      <Modal open={openProfileModel} onClose={() => setOpenProfileModel(false)}>
        <EditForm
          updatedApplicant={updatedApplicant}
          setUpdatedApplicant={setUpdatedApplicant}
          submitChange={submitChange}
        />
      </Modal>
    </>
  );
}
