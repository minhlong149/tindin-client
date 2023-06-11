import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import { useParams } from 'react-router-dom';

import OrganizationService from '../../services/organization.js';
import EmailIcon from '@mui/icons-material/Email';
import WebsiteIcon from '@mui/icons-material/Language';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';

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

  const [job, setJob] = useState({});
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
    <Stack alignItems='center' spacing={3}>
      <Stack direction='row' spacing={4}>
        {organization.name && (
          <Stack direction='row' alignItems='center' spacing={2}>
            <LocationOnIcon />
            <Typography variant='body2'>{organization.name}</Typography>
          </Stack>
        )}

        {organization.email && (
          <Stack direction='row' alignItems='center' spacing={2}>
            <EmailIcon />
            <Typography variant='body2'>{organization.email}</Typography>
          </Stack>
        )}

        {organization.phone && (
          <Stack direction='row' alignItems='center' spacing={2}>
            <PhoneIcon />
            <Typography variant='body2'>{organization.phone}</Typography>
          </Stack>
        )}

        {organization.website && (
          <Stack direction='row' alignItems='center' spacing={2}>
            <WebsiteIcon />
            <Typography variant='body2'>{organization.website}</Typography>
          </Stack>
        )}

        {organization.location && (
          <Stack direction='row' alignItems='center' spacing={2}>
            <Typography variant='body2'>{organization.location}</Typography>
          </Stack>
        )}

        {organization.industry && (
          <Stack direction='row' alignItems='center' spacing={2}>
            <Typography variant='body2'>{organization.industry}</Typography>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
}
