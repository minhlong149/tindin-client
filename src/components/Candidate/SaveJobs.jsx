import React, { useContext, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CircularProgress,
  Grid,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import JobService from '../../services/job.js';
import { UserContext } from '../../App.jsx';

const SaveJobs = () => {
  const user = useContext(UserContext);
  const [jobList, setJobList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAppliedJobs = async () => {
    try {
      setIsLoading(true);
      const jobs = await JobService.getAppliedJobs(user.user.account_id);
      setJobList(jobs);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelApplication = async (jobId) => {
    try {
      await cancelApplication(jobId);
      setJobList(jobList.filter((job) => job.id !== jobId));
    } catch (error) {
      console.error(error);
    }
  };

  const inforJob = async (job) => {
    try {
      navigate(`/jobs/${job.id}`);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchAppliedJobs();
  }, []);
  return (
    <section id='saved-jobs'>
      <Typography variant='h4' color='primary'>
        Danh sách công việc đã ứng tuyển
      </Typography>

      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={2} mt={5}>
          {jobList.map((job) => (
            <Grid item xs={12} sm={6} md={4} key={job.id}>
              <Card>
                <CardActionArea
                  component={Link}
                  to={`/jobs/${job.id}`}
                  onClick={() => inforJob(job)}
                >
                  <Box p={2}>
                    <Typography variant='h6' component='div' textAlign='center' mb={2}>
                      {job.title}
                    </Typography>
                    <Typography variant='subtitle1' component='div' textAlign='center' mb={1}>
                      {job.recruiter.organization.name}
                    </Typography>
                    <Typography variant='body1' component='div' textAlign='center' mb={1}>
                      {job.salary} vnđ
                    </Typography>
                    <Typography variant='body2' component='div' textAlign='center'>
                      {job.recruiter.organization.location}
                    </Typography>
                  </Box>
                </CardActionArea>
                <Box p={2} display='flex' justifyContent='flex-end'>
                  <Button color='error' onClick={() => handleCancelApplication(job.id)}>
                    Hủy ứng tuyển
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </section>
  );
};

export default SaveJobs;
