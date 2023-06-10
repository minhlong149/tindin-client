import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import ApplicantService from '../../services/applicant.js';
import { Loading } from './Profiles/Loading.jsx';
import { EducationsInfo } from './Profiles/EducationsInfo.jsx';
import { SkillsInfo } from './Profiles/SkillsInfo.jsx';
import { UserInfo } from './Profiles/UserInfo.jsx';
import { ExperiencesInfo } from './Profiles/ExperiencesInfo.jsx';

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

  const updateApplicant = async (updatedApplicant) => {
    try {
      const response = await ApplicantService.updateApplicant(candidateId, updatedApplicant);
      setApplicant(response);
    } catch (error) {
      console.log(error);
    }
  };

  return status !== 'Success' ? (
    <Loading status={status} />
  ) : (
    <Stack alignItems='center' spacing={3}>
      <UserInfo applicant={applicant} handleSubmit={updateApplicant} />
      <SkillsInfo skills={applicant.skills.sort(({ skillLevel }) => -skillLevel)} />
      <ExperiencesInfo experiences={applicant.experiences} />
      <EducationsInfo educations={applicant.educations} />
    </Stack>
  );
}
