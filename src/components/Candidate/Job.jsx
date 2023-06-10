import { Link, useNavigate, useParams } from 'react-router-dom';
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import NavBar from './NavBar.jsx';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../App.jsx';
import JobService from '../../services/job.js'
import moment from 'moment';
import FavoriteBorderSharpIcon from '@mui/icons-material/FavoriteBorderSharp';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import LocationOnSharpIcon from '@mui/icons-material/LocationOnSharp';
function Job() {
  const user = useContext(UserContext);
  const { jobId } = useParams();
  const [job, setJob] = useState({});
  const [org, setOrg] = useState({});
  const [recruiter, setRecruiter] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isApply, setIsApply] = useState(true);
  const [tabIndex, setTabIndex] = useState(0);
  const [skill, setSkill] = useState([]);
  const [degree, setDegree] = useState([]);
  const [major, setMajor] = useState([]);
  const [level, setLevel] = useState([]);
  const handleTabChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };
 useEffect(() => {
   async function fetchJob() {
     setIsLoading(true);
     const response = await JobService.getDetailJob(jobId);
     const data = await response.data;
     setJob(data);
     setRecruiter(data.recruiter);
     setOrg(data.recruiter.organization);
     setDegree(data.requireDegrees);
     setMajor(data.requireMajors);
     setSkill(data.requireSkills);
     setLevel(data.requireExperienceLevels)
     setIsLoading(false);
   }
   fetchJob();
 }, [jobId]);
  console.log(user);

  const fetchApply = async () => {
    try {
    const res = await JobService.getListApplicantByJobId(jobId);
    const data = await res.data;
    setIsApply(data.some((user) => user.accountId === user.user.account_id));  
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    console.log(isApply);
    fetchApply();
    
  }, [jobId]);

  console.log(jobId);
  console.log(job);
  console.log(org);
  console.log(isApply);
  return (
    <>
      <NavBar />
      {isLoading ? (
        <Box
          sx={{
            px: 5,
            py: 5,
            backgroundColor: '#F7F7F7',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <section>
          <Box sx={{ display: 'flex', justifyContent: 'center', margin: 10, padding: 5 }}>
            <img
              height={100}
              width={100}
              src='https://www.upenn.edu/themes/custom/penn_global/assets/img/simplified-shield.ico'
            ></img>
            <Box paddingLeft={5}>
              <Typography variant='h5'>{job.title}</Typography>
              <Link to='/organization' style={{ textDecoration: 'none' }}>
                <Typography variant='boby1'>{org.name}</Typography>
              </Link>

              <Link to='/organization' style={{ textDecoration: 'none' }}>
                <Typography variant='boby1'>{org.name}</Typography>
              </Link>
              <Typography variant='body1'>
                <span>Location: </span>
                <span>{org.location}</span>
              </Typography>
              <Typography color={'#f44336'}>{job.salary}</Typography>
              <Typography>
                {'Closing date: ' + moment(job.closingDate).format('Do MMMM YYYY')}
              </Typography>
            </Box>
            <Button
              variant='contained'
              sx={{ marginLeft: 2, backgroundColor: '#FF7D55', height: 50, width: 130 }}
            >
              {'Quan tâm '}
              <FavoriteBorderSharpIcon />
            </Button>
          </Box>

          <Box
            backgroundColor='#F6F6F6'
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <Box width={1000} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Tabs value={tabIndex} onChange={handleTabChange}>
                <Tab label='Thông Tin' />
                <Tab label='Công ty' />
              </Tabs>
            </Box>
            <Box
              backgroundColor='#FFFFFF'
              width={700}
              sx={{ padding: 2, alignItems: 'flex-start' }}
              height={500}
            >
              <Box>
                {tabIndex === 0 && (
                  <Box>
                    <Box margin={2}>
                      <Typography variant='h5' marginBottom={2}>
                        Description
                      </Typography>
                      <Typography variant='body2' marginLeft={3}>
                        {job.description}
                      </Typography>
                    </Box>
                    <Box margin={2}>
                      <Typography variant='h5' marginBottom={2}>
                        Job Requirement
                      </Typography>
                     
                    </Box>
                    <Box margin={2}>
                      <Typography variant='h5' marginBottom={2}>
                        Location
                      </Typography>

                      <Typography variant='body2' marginLeft={3}>
                        <LocationOnSharpIcon></LocationOnSharpIcon>
                        {org.location}
                      </Typography>
                    </Box>
                  </Box>
                )}
                {tabIndex === 1 && (
                  <Box>
                    <Typography>Công Ty</Typography>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </section>
      )}
    </>
  );
}

export default Job