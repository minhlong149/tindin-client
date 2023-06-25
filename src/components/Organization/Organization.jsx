import { Card, CardContent, ListItem, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/system';
import OrganizationService from '../../services/organization.js';
import { List } from '@mui/material';
import { Link } from 'react-router-dom';
import {styled} from '@mui/material';
import {Paper} from '@mui/material';

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
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  

  return (
    <List
      sx={{
        width: '100%',
        bgcolor: 'background.paper',
      }}
    >
      <Box sx={{
                  component: 'span',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  width: '70%',
                }}
                marginLeft={5}>
      
      {/* <Stack alignItems='center' spacing={3}> */}
        <div>
            <Typography variant='h5' fo marginTop={10} marginBottom={3}>
              Information of organization
            </Typography>
        </div>
       <Stack direction='column' spacing={4} alignItems='left' variant='h3'>
        <Item>
          {organization.name && (
            <Stack direction='row' alignItems='center' spacing={2}>
              <Typography variant='h6'>
              Name
            </Typography>
              <Typography variant='body2'>{organization.name}</Typography>
            </Stack>
          )}
        </Item>
        <Item>
          {organization.email && (
            <Stack direction='row' alignItems='center' spacing={2}>
              <Typography variant='h6'>
              Email
            </Typography>
              <Typography variant='body2'>{organization.email}</Typography>
            </Stack>
          )}
        </Item>
        <Item>
          {organization.phone && (
            <Stack direction='row' alignItems='center' spacing={2}>
            <Typography variant='h6'>
              Phone number
            </Typography>    
            <Typography variant='body2'>{organization.phone}</Typography>
            </Stack>
          )}
        </Item>
        <Item>
          {organization.website && (
            <Stack direction='row' alignItems='center' spacing={2}>
              <Typography variant='h6'>
              Website
              </Typography>
              <Link to={organization.website} style={{ textDecoration: 'none' }}>
                <Typography variant='body2'>{organization.website}</Typography>
              </Link>
            </Stack>
          )}
        </Item>
        <Item>
          {organization.location && (
            <Stack direction='row' alignItems='center' spacing={2}>
              <Typography variant='h6'>
              Location
              </Typography>
              <Typography variant='body2'>{organization.location}</Typography>
            </Stack>
          )}
        </Item>
        <Item>
          {organization.industry && (
            
            <Stack direction='row' alignItems='center' spacing={2}>
              <Typography variant='h6'>
              Field
              </Typography>
              <Typography variant='body2'>{organization.industry}</Typography>
            </Stack>
          )}
        </Item>
      </Stack> 
      </Box>
      
      <Box sx={{ flexDirection: 'column', alignItems: 'center' }}>
        {job && job.length > 0 && (
          <>
            <Typography variant='h5' fo marginTop={10} marginBottom={3}>
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
