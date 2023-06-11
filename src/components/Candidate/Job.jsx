import { Link, useNavigate, useParams } from 'react-router-dom';
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../App.jsx';
import JobService from '../../services/job.js'
import moment from 'moment';
import FavoriteBorderSharpIcon from '@mui/icons-material/FavoriteBorderSharp';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import LocationOnSharpIcon from '@mui/icons-material/LocationOnSharp';
import LaunchIcon from '@mui/icons-material/Launch';
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
                borderRadius={2}
                marginBottom={10}
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
                      <Typography variant='h5' marginBottom={2} marginTop={2}>
                        Job Requirement
                      </Typography>

                      {job.requireDegrees && job.requireDegrees.length > 0 && (
                        <>
                          <Typography variant='body1' marginLeft={3}>
                            Required Degrees:
                          </Typography>
                          {job.requireDegrees.map((degree, index) => (
                            <Typography key={index} variant='body2' marginLeft={5}>
                              {degree}
                            </Typography>
                          ))}
                        </>
                      )}

                      {job.requireExperienceLevels && job.requireExperienceLevels.length > 0 && (
                        <>
                          <Typography variant='body1' marginLeft={3}>
                            Required Experience:
                          </Typography>
                          {job.requireExperienceLevels.map((exper, index) => (
                            <Typography key={index} variant='body2' marginLeft={5}>
                              {exper}
                            </Typography>
                          ))}
                        </>
                      )}

                      {job.jobrequireMajors && job.requireMajors.length > 0 && (
                        <>
                          <Typography variant='body1' marginLeft={3}>
                            Required Major:
                          </Typography>
                          {job.jobrequireMajors.map((major, index) => (
                            <Typography key={index} variant='body2' marginLeft={5}>
                              {major}
                            </Typography>
                          ))}
                        </>
                      )}

                      {job.requireSkills && job.requireSkills.length > 0 && (
                        <>
                          <Typography variant='body1' marginLeft={3}>
                            Required Skills:
                          </Typography>
                          {job.requireSkills.map((skill, index) => (
                            <Typography key={index} variant='body1' marginLeft={5}>
                              {skill.skill}
                            </Typography>
                          ))}
                        </>
                      )}
                    </Box>
                    <Box margin={2}>
                      <Typography variant='h5' marginBottom={2} marginTop={2}>
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
                    <Link to={'/organizations/' + org.id} variant='body2' marginLeft={3}>
                      <Typography marginLeft={3} padding={2}>
                        <span>Xem thông tin chi tiết doanh nghiệp</span>
                        <span>
                          <LaunchIcon></LaunchIcon>
                        </span>
                      </Typography>
                    </Link>
                    <Typography variant='body2' marginLeft={3}>
                      {org.description}
                    </Typography>
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