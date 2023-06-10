import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import EditIcon from '@mui/icons-material/Edit';
import EmailIcon from '@mui/icons-material/Email';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import WebsiteIcon from '@mui/icons-material/Language';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import Fab from '@mui/material/Fab';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import ApplicantService from '../../services/applicant.js';

export default function Profile() {
  // TODO: Check if applicantId is same as logged in user
  const { candidateId } = useParams();

  const [status, setStatus] = useState('Loading');
  const [applicant, setApplicant] = useState({});

  const getApplicant = async () => {
    try {
      const response = await ApplicantService.getApplicantById(candidateId);
      setApplicant(response);
      setStatus('Success');
    } catch (error) {
      console.log(error);
      setStatus('User not found');
    }
  };

  useEffect(() => {
    getApplicant();
  }, []);

  useEffect(() => {
    console.log(applicant);
  }, [applicant]);

  const [openProfileModel, setOpenProfileModel] = useState(false);

  const handleSubmit = async (updatedApplicant) => {
    try {
      const response = await ApplicantService.updateApplicant(candidateId, updatedApplicant);
      setApplicant(response);
    } catch (error) {
      console.log(error);
      // TODO: Show error modal on screen
    } finally {
      setOpenProfileModel(false);
    }
  };

  return status !== 'Success' ? (
    <Message status={status} />
  ) : (
    <Stack alignItems='center' spacing={6}>
      <UserInfo
        applicant={applicant}
        handleSubmit={handleSubmit}
        openProfileModel={openProfileModel}
        setOpenProfileModel={setOpenProfileModel}
      />

      <EducationsInfo educations={applicant.educations} />
    </Stack>
  );
}

function UserInfo({ applicant, handleSubmit, openProfileModel, setOpenProfileModel }) {
  const [updatedApplicant, setUpdatedApplicant] = useState(applicant);
  return (
    <>
      <Stack>
        <Avatar
          sx={{
            height: '150px',
            width: '150px',
          }}
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
            <Typography variant='body2'>{applicant.user.website}</Typography>
          </Stack>
        )}
      </Stack>
      <Modal open={openProfileModel} onClose={() => setOpenProfileModel(false)}>
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
                  onChange={(e) =>
                    setUpdatedApplicant({
                      ...updatedApplicant,
                      user: { ...updatedApplicant.user, firstName: e.target.value },
                    })
                  }
                  fullWidth
                />
                <TextField
                  label='Last Name'
                  value={updatedApplicant.user.lastName ?? ''}
                  onChange={(e) =>
                    setUpdatedApplicant({
                      ...updatedApplicant,
                      user: { ...updatedApplicant.user, lastName: e.target.value },
                    })
                  }
                  fullWidth
                />
              </Stack>

              <Stack direction='row' spacing={2}>
                <TextField
                  label='Date of birth'
                  type='date'
                  value={updatedApplicant.user.dateOfBirth ?? ''}
                  onChange={(e) =>
                    setUpdatedApplicant({ ...updatedApplicant, dateOfBirth: e.target.value })
                  } // TODO: Fix date format
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                />
                <TextField
                  label='Prefered location'
                  value={updatedApplicant.preferLocation ?? ''}
                  onChange={(e) =>
                    setUpdatedApplicant({ ...updatedApplicant, preferLocation: e.target.value })
                  }
                  fullWidth
                />
              </Stack>

              <TextField
                label='Job title'
                value={updatedApplicant.title ?? ''}
                onChange={(e) =>
                  setUpdatedApplicant({ ...updatedApplicant, title: e.target.value })
                }
                fullWidth
              />
              <TextField
                label='Email'
                value={updatedApplicant.user.email ?? ''}
                onChange={(e) =>
                  setUpdatedApplicant({
                    ...updatedApplicant,
                    user: { ...updatedApplicant.user, email: e.target.value },
                  })
                }
                fullWidth
              />
              <TextField
                label='Phone'
                value={updatedApplicant.user.phone ?? ''}
                onChange={(e) =>
                  setUpdatedApplicant({
                    ...updatedApplicant,
                    user: { ...updatedApplicant.user, phone: e.target.value },
                  })
                }
                fullWidth
              />
              <TextField
                label='Website'
                value={updatedApplicant.user.website ?? ''}
                onChange={(e) =>
                  setUpdatedApplicant({
                    ...updatedApplicant,
                    user: { ...updatedApplicant.user, website: e.target.value },
                  })
                }
                fullWidth
              />
              {/* TODO: Add username and password */}
            </Stack>

            <Stack direction='row' justifyContent='flex-end'>
              <Button
                variant='contained'
                color='primary'
                onClick={() => handleSubmit(updatedApplicant)}
              >
                Save
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}

function Message({ status }) {
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

function EducationsInfo({ educations }) {
  const [expanded, setExpanded] = useState(false);
  const handleChange = (panel) => (e, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Accordion
      expanded={expanded === 'panel1'}
      onChange={handleChange('panel1')}
      sx={{
        width: '100%',
        maxWidth: '800px',
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography
          sx={{
            width: '33%',
            flexShrink: 0,
          }}
        >
          Educations
        </Typography>
        <Typography
          sx={{
            color: 'text.secondary',
          }}
        >
          {educations.map((educations) => educations.degree).join(', ')}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box
          sx={{
            width: '100%',
            bgcolor: 'background.paper',
          }}
        >
          {educations.map((education, index) => (
            <>
              <Education key={education.id} education={education} />
              {index !== educations.length - 1 && <Divider />}
            </>
          ))}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}

function Education({ education }) {
  const [open, setOpen] = useState(true);
  const { universityName, location, degree, major, startDate, completionDate, gpa } = education;
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <ListItemButton onClick={() => setOpen(!open)}>
        <ListItemText primary={universityName} secondary={`${degree} - ${major}`} />
        {open ? <ExpandLessIcon /> : <ExpandMoreIcon/>}
      </ListItemButton>
      <Collapse in={open} timeout='auto' unmountOnExit>
        <List disablePadding>
          {major && (
            <ListItem sx={{ pl: 4 }}>
              <ListItemText primary={`Location: ${location}`} />
            </ListItem>
          )}
          {startDate && (
            <ListItem sx={{ pl: 4 }}>
              <ListItemText primary={`Start Date: ${new Date(startDate).toLocaleDateString()}`} />
            </ListItem>
          )}
          {completionDate && (
            <ListItem sx={{ pl: 4 }}>
              <ListItemText primary={`Completion Date: ${new Date(completionDate).toLocaleDateString()}`} />
            </ListItem>
          )}
          {gpa && (
            <ListItem sx={{ pl: 4 }}>
              <ListItemText primary={`GPA: ${gpa}`} />
            </ListItem>
          )}
        </List>
      </Collapse>
    </List>
  );
}
