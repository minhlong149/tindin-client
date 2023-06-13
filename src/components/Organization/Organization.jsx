import { ListItem, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/system';
import OrganizationService from '../../services/organization.js';
import EmailIcon from '@mui/icons-material/Email';
import WebsiteIcon from '@mui/icons-material/Language';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import { List } from '@mui/material';
import { Link } from 'react-router-dom';
export default function Organization() {
  const { organizationId } = useParams();

  const [organization, setOrganization] = useState({});
  const getOrganization = async () => {
    try {
      const response = await OrganizationService.getOrganizationById(organizationId);
      setOrganization(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrganization();
  }, []);

  useEffect(() => {
    console.log({ organization });
  }, [organization]);

  const [job, setJob] = useState([]);
  const getJobByOrganizationId = async () => {
    try {
      const response = await OrganizationService.getJobByOrganizationId(organizationId);
      setJob(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getJobByOrganizationId();
  }, []);

  useEffect(() => {
    console.log({ job });
  }, [job]);

  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
      }}
    >
      {/* <Stack alignItems='center' spacing={3}> */}
      <Stack direction='row' spacing={4} alignItems='center'>
        <ListItem>
          {organization.name && (
            <Stack direction='row' alignItems='center' spacing={2}>
              <LocationOnIcon />
              <Typography variant='body2'>{organization.name}</Typography>
            </Stack>
          )}
        </ListItem>
        <ListItem>
          {organization.email && (
            <Stack direction='row' alignItems='center' spacing={2}>
              <EmailIcon />
              <Typography variant='body2'>{organization.email}</Typography>
            </Stack>
          )}
        </ListItem>
        <ListItem>
          {organization.phone && (
            <Stack direction='row' alignItems='center' spacing={2}>
              <PhoneIcon />
              <Typography variant='body2'>{organization.phone}</Typography>
            </Stack>
          )}
        </ListItem>
        <ListItem>
          {organization.website && (
            <Stack direction='row' alignItems='center' spacing={2}>
              <WebsiteIcon />
              <Typography variant='body2'>{organization.website}</Typography>
            </Stack>
          )}
        </ListItem>
        <ListItem>
          {organization.location && (
            <Stack direction='row' alignItems='center' spacing={2}>
              <Typography variant='body2'>{organization.location}</Typography>
            </Stack>
          )}
        </ListItem>
        <ListItem>
          {organization.industry && (
            <Stack direction='row' alignItems='center' spacing={2}>
              <Typography variant='body2'>{organization.industry}</Typography>
            </Stack>
          )}
        </ListItem>
      </Stack>
      <Box sx={{ flexDirection: 'column', alignItems: 'center' }}>
        {job && job.length > 0 && (
          <>
            <Typography variant='h5' marginTop={10} marginBottom={3}>
              List jobs posted
            </Typography>
            {job.map((job) => (
              <Box
                sx={{
                  justifyContent: 'center',
                  flexDirection: 'column',
                  width: 1000,
                }}
                marginLeft={5}
              >
                <Typography variant='h6'>
                  <Link to={'/jobs/' + job.id} style={{ textDecoration: 'none' }}>
                    {job.title}
                  </Link>
                  <Typography variant='body1' marginLeft={6}>
                    <span>Status: </span>
                    <span>{job.isOpen ? 'Opening' : 'Closed'}</span>
                  </Typography>

                  <Typography variant='body1' marginLeft={6}>
                    <span>Type: </span>
                    <span>{job.jobType}</span>
                  </Typography>

                  <Typography variant='body1' marginLeft={6}>
                    <span>Salary: </span>
                    <span>{job.salary}</span>
                  </Typography>

                  <Typography variant='body1' marginLeft={6}>
                    Description:
                    <Typography variant='body2' marginLeft={7}>
                      {job.description}
                    </Typography>
                  </Typography>
                </Typography>
              </Box>
            ))}
          </>
        )}
      </Box>
    </List>
  );
}
