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
import FavoriteIcon from '@mui/icons-material/Favorite';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import LocationOnSharpIcon from '@mui/icons-material/LocationOnSharp';
import LaunchIcon from '@mui/icons-material/Launch';
import HelpIcon from '@mui/icons-material/Help';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
function Job() {
  const user = useContext(UserContext);
  const { jobId } = useParams();
  const [job, setJob] = useState({});
  const [org, setOrg] = useState({});
  const [recruiter, setRecruiter] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isApply, setIsApply] = useState(false);
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
      console.log(data);
    setIsApply(data.some((users) => users.user.accountId === user.user.account_id));  
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    console.log(isApply);
    fetchApply();
    
  }, [jobId, isApply]);

  const applyThisJob = async () => {
    if (isApply) {
      await JobService.unapplyJob(jobId, user.user.account_id);
      await setIsApply(false);
    } else {
      await JobService.applyJob(jobId, user.user.account_id);
      await setIsApply(true);
    }
    
  };
  const images = [
    {
      label: 'Image 1',
      caption: 'Caption for image 1',
      imgPath: 'https://source.unsplash.com/random',
    },
    {
      label: 'Image 2',
      caption: 'Caption for image 2',
      imgPath: 'https://source.unsplash.com/random',
    },
    {
      label: 'Image 3',
      caption: 'Caption for image 3',
      imgPath: 'https://source.unsplash.com/random',
    },
  ];
  const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      nextArrow: null,
      prevArrow: null,
    };
  console.log(jobId);
  console.log(job);
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
              <Link to={'/organizations/' + org.id} style={{ textDecoration: 'none' }}>
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
              sx={{
                marginLeft: 2,
                backgroundColor: isApply ? 'green' : '#FF7D55',
                height: 50,
                width: 130,
              }}
              onClick={() => applyThisJob()}
            >
              {isApply ? 'UnApply' : 'Apply'}
              {isApply ? <FavoriteIcon /> : <FavoriteBorderSharpIcon />}
            </Button>
          </Box>
          <Box>
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
                        <Typography
                          variant='h5'
                          marginBottom={2}
                          style={{ fontWeight: 'bold', textTransform: 'uppercase' }}
                        >
                          Description
                        </Typography>
                        <Typography
                          variant='body2'
                          marginLeft={3}
                          style={{ fontWeight: 'lighter' }}
                        >
                          {job.description}
                        </Typography>
                      </Box>
                      <Box margin={2}>
                        <Typography
                          variant='h5'
                          marginBottom={2}
                          marginTop={2}
                          style={{ fontWeight: 'bold', textTransform: 'uppercase' }}
                        >
                          Job Requirement
                        </Typography>

                        {job.requireDegrees && job.requireDegrees.length > 0 && (
                          <>
                            <Typography variant='body1' marginLeft={3}>
                              Required Degrees:
                            </Typography>
                            {job.requireDegrees.map((degree, index) => (
                              <Typography
                                key={index}
                                variant='body2'
                                marginLeft={5}
                                style={{ fontWeight: 'lighter' }}
                              >
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
                              <Typography
                                key={index}
                                variant='body2'
                                marginLeft={5}
                                style={{ fontWeight: 'lighter' }}
                              >
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
                              <Typography
                                key={index}
                                variant='body2'
                                marginLeft={5}
                                style={{ fontWeight: 'lighter' }}
                              >
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
                              <Typography
                                key={index}
                                variant='body2'
                                marginLeft={5}
                                style={{ fontWeight: 'lighter' }}
                              >
                                {skill.skill}
                              </Typography>
                            ))}
                          </>
                        )}
                      </Box>
                      <Box margin={2}>
                        <Typography
                          variant='h5'
                          marginBottom={2}
                          marginTop={2}
                          style={{ fontWeight: 'bold', textTransform: 'uppercase' }}
                        >
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

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant='h5'>
                <HelpIcon />
                How to find a safe job
              </Typography>
              <Typography variant='body2'>
                Here are the signs of non-transparent recruiting organizations and individuals:
              </Typography>
              <Typography variant='body1'>1. Popular signs:</Typography>
              {/* <Slider {...settings}>
                {images.map((image) => (
                  <Box>
                    <img
                      src={step.imgPath}
                      alt={step.label}
                      style={{ width: '100%', height: 'auto' }}
                    />
                    <Typography>{step.caption}</Typography>
                  </Box>
                ))}
              </Slider> */}
            </Box>
          </Box>
        </section>
      )}
    </>
  );
}

export default Job