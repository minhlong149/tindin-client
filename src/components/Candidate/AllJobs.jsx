import { Link, useNavigate } from 'react-router-dom';
import * as React from 'react';
import ApplicantService from '../../services/applicant.js';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import { CardActionArea, SvgIcon } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../App.jsx';
import CircularProgress from '@mui/material/CircularProgress';
import { dark } from '@mui/material/styles/createPalette.js';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LocationOnSharpIcon from '@mui/icons-material/LocationOnSharp';
import PaidIcon from '@mui/icons-material/Paid';
import BusinessIcon from '@mui/icons-material/Business';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function AllJobs() {
   const theme = createTheme({
     components: {
       MuiCssBaseline: {
         styleOverrides: {
           body: {
             backgroundColor: '#F7F7F7',
           },
         },
       },
     },
   });
  const user = useContext(UserContext);
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [jobs, setJobs] = useState([]);

  const [jobsPT, setJobsPT] = useState([]);
  const [pagePT, setPagePT] = useState(0);

  const [jobsFT, setJobsFT] = useState([]);
  const [pageFT, setPageFT] = useState(0);
  
   const [jobsIT, setJobsIT] = useState([]);
  const [pageIT, setPageIT] = useState(0);
  
  const [isLoading, setIsLoading] = useState(false);


  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 0));
  };
  console.log(user);
  const GetJobRecommend = async () => {
    setIsLoading(true);
    const res = await ApplicantService.getRecommendJobByApplicantId(user.user.account_id, page);
    setJobs(res.data);
    setIsLoading(false);
  };
  useEffect(() => {
    GetJobRecommend();
  }, [page]);
  // console.log(jobs);


  const handleNextPagePT = () => {
    setPagePT((prevPage) => prevPage + 1);
  };

  const handlePrevPagePT = () => {
    setPagePT((prevPage) => Math.max(prevPage - 1, 0));
  };

  console.log(user);

  const GetJobPT = async () => {
    setIsLoading(true);
    const res = await ApplicantService.getJobPT(user.user.account_id, page);
    setJobsPT(res.data);
    setIsLoading(false);
  };
  useEffect(() => {
    GetJobPT();
  }, [pagePT]);
  console.log(jobsPT);

const handleNextPageFT = () => {
  setPageFT((prevPage) => prevPage + 1);
};

const handlePrevPageFT = () => {
  setPageFT((prevPage) => Math.max(prevPage - 1, 0));
};

console.log(user);

const GetJobFT = async () => {
  setIsLoading(true);
  const res = await ApplicantService.getJobFT(user.user.account_id, page);
  setJobsFT(res.data);
  setIsLoading(false);
};
useEffect(() => {
  GetJobFT();
}, [pageFT]);
console.log(jobsFT);

  const handleNextPageIT = () => {
    setPageFT((prevPage) => prevPage + 1);
  };

  const handlePrevPageIT = () => {
    setPageFT((prevPage) => Math.max(prevPage - 1, 0));
  };

  console.log(user);

  const GetJobIT = async () => {
    setIsLoading(true);
    const res = await ApplicantService.getJobIT(user.user.account_id, page);
    setJobsIT(res.data);
    setIsLoading(false);
  };
  useEffect(() => {
    GetJobIT();
  }, [pageIT]);
  console.log(jobsIT);
  
  const inforJob = (job) => {
    navigate(`/jobs/${job.id}`);
  };

  return (
    // <div>AllJobs</div>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ backgroundColor: '#FFFFFF' }}>
        <Box
          sx={{
            m: 3,
            p: 5,
            px: 14,
            marginLeft: 10,
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        >
          <Typography
            variant='h5'
            style={{ fontWeight: 'bold', textTransform: 'uppercase', color: '#1976d2' }}
          >
            1000 latest job vacancies, job search 24 hours a day nationwide!
          </Typography>
          <Typography
            variant='body2'
            style={{ fontWeight: 'lighter', color: '#1976d2' }}
            flexDirection={'column'}
          >
            Reach 1,000+ reputable recruitment businesses. New job every day with a high, attractive
            salary and extremely good remuneration!
          </Typography>
        </Box>
      </Box>
      <section id='all-jobs'>
        <section id='recommend-job'>
          <div sx={{ justifyContent: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Box borderRadius={5} border={1} color={'#0d47a1'} margin={5} width={1000}>
                <Typography
                  variant='h4'
                  color={dark}
                  sx={{
                    backgroundColor: '#e3f2fd',
                    padding: 3,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                  }}
                >
                  Suggested jobs
                </Typography>
                <Box
                  sx={{
                    borderRadius: 2,
                    marginTop: 5,
                    mx: 5,
                    marginBottom: 5,
                    px: 3,
                    paddingTop: 3,
                    paddingBottom: 2,
                    backgroundColor: '#F7F7F7',
                  }}
                >
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
                    <Carousel>
                      <Grid container spacing={2} columnSpacing={2} key={page}>
                        {jobs.map((job, index) => (
                          <Grid item xs={3} key={index}>
                            <CardActionArea onClick={() => inforJob(job)}>
                              <Card style={{ width: 200, height: 200 }}>
                                <Typography
                                  gutterBottom
                                  variant='h6'
                                  component='div'
                                  textAlign={'center'}
                                  margin={2}
                                >
                                  {job.title}
                                </Typography>
                                <Typography
                                  gutterBottom
                                  variant='h7'
                                  component='div'
                                  textAlign={'center'}
                                >
                                  <BusinessIcon style={{ color: 'gray', fontSize: 'medium' }} />
                                  {job.organizationDto.name}
                                </Typography>
                                <Typography
                                  gutterBottom
                                  variant='body1'
                                  component='div'
                                  textAlign={'center'}
                                  color={'#f44336'}
                                >
                                  <PaidIcon style={{ color: 'gray', fontSize: 'medium' }} />
                                  {job.salary} vnđ
                                </Typography>
                                <Typography
                                  gutterBottom
                                  variant='body2'
                                  component='div'
                                  textAlign={'center'}
                                >
                                  <LocationOnSharpIcon
                                    style={{ color: 'gray', fontSize: 'medium' }}
                                  />
                                  {job.organizationDto.location}
                                </Typography>
                              </Card>
                            </CardActionArea>
                          </Grid>
                        ))}
                      </Grid>
                      {/* ))} */}
                    </Carousel>
                  )}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button onClick={handlePrevPage} disabled={page === 0}>
                      Trang trước
                    </Button>
                    <Button onClick={handleNextPage}>Trang sau</Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          </div>
        </section>

        <section id='parttime-job'>
          <div sx={{ justifyContent: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Box borderRadius={5} border={1} color={'#0d47a1'} margin={5} width={1000}>
                <Typography
                  variant='h4'
                  color={dark}
                  sx={{
                    backgroundColor: '#e3f2fd',
                    padding: 3,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                  }}
                >
                  Part-time jobs
                </Typography>
                <Box
                  sx={{
                    borderRadius: 2,
                    marginTop: 5,
                    mx: 5,
                    marginBottom: 5,
                    px: 3,
                    paddingTop: 3,
                    paddingBottom: 2,
                    backgroundColor: '#F7F7F7',
                  }}
                >
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
                    <Carousel>
                      <Grid container spacing={2} columnSpacing={2} key={page}>
                        {jobsPT.map((job, index) => (
                          <Grid item xs={3} key={index}>
                            <CardActionArea onClick={() => inforJob(job)}>
                              <Card style={{ width: 200, height: 200 }}>
                                <Typography
                                  gutterBottom
                                  variant='h6'
                                  component='div'
                                  textAlign={'center'}
                                  margin={2}
                                >
                                  {job.title}
                                </Typography>
                                <Typography
                                  gutterBottom
                                  variant='h7'
                                  component='div'
                                  textAlign={'center'}
                                >
                                  <BusinessIcon style={{ color: 'gray', fontSize: 'medium' }} />
                                  {job.organizationDto.name}
                                </Typography>
                                <Typography
                                  gutterBottom
                                  variant='body1'
                                  component='div'
                                  textAlign={'center'}
                                  color={'#f44336'}
                                >
                                  <PaidIcon style={{ color: 'gray', fontSize: 'medium' }} />
                                  {job.salary} vnđ
                                </Typography>
                                <Typography
                                  gutterBottom
                                  variant='body2'
                                  component='div'
                                  textAlign={'center'}
                                >
                                  <LocationOnSharpIcon
                                    style={{ color: 'gray', fontSize: 'medium' }}
                                  />
                                  {job.organizationDto.location}
                                </Typography>
                              </Card>
                            </CardActionArea>
                          </Grid>
                        ))}
                      </Grid>
                      {/* ))} */}
                    </Carousel>
                  )}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button onClick={handlePrevPagePT} disabled={page === 0}>
                      Trang trước
                    </Button>
                    <Button onClick={handleNextPagePT}>Trang sau</Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          </div>
        </section>

        <section id='fulltime-job'>
          <div sx={{ justifyContent: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Box borderRadius={5} border={1} color={'#0d47a1'} margin={5} width={1000}>
                <Typography
                  variant='h4'
                  color={dark}
                  sx={{
                    backgroundColor: '#e3f2fd',
                    padding: 3,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                  }}
                >
                  Full-time jobs
                </Typography>
                <Box
                  sx={{
                    borderRadius: 2,
                    marginTop: 5,
                    mx: 5,
                    marginBottom: 5,
                    px: 3,
                    paddingTop: 3,
                    paddingBottom: 2,
                    backgroundColor: '#F7F7F7',
                  }}
                >
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
                    <Carousel>
                      <Grid container spacing={2} columnSpacing={2} key={page}>
                        {jobsFT.map((job, index) => (
                          <Grid item xs={3} key={index}>
                            <CardActionArea onClick={() => inforJob(job)}>
                              <Card style={{ width: 200, height: 200 }}>
                                <Typography
                                  gutterBottom
                                  variant='h6'
                                  component='div'
                                  textAlign={'center'}
                                  margin={2}
                                >
                                  {job.title}
                                </Typography>
                                <Typography
                                  gutterBottom
                                  variant='h7'
                                  component='div'
                                  textAlign={'center'}
                                >
                                  <BusinessIcon style={{ color: 'gray', fontSize: 'medium' }} />
                                  {job.organizationDto.name}
                                </Typography>
                                <Typography
                                  gutterBottom
                                  variant='body1'
                                  component='div'
                                  textAlign={'center'}
                                  color={'#f44336'}
                                >
                                  <PaidIcon style={{ color: 'gray', fontSize: 'medium' }} />
                                  {job.salary} vnđ
                                </Typography>
                                <Typography
                                  gutterBottom
                                  variant='body2'
                                  component='div'
                                  textAlign={'center'}
                                >
                                  <LocationOnSharpIcon
                                    style={{ color: 'gray', fontSize: 'medium' }}
                                  />
                                  {job.organizationDto.location}
                                </Typography>
                              </Card>
                            </CardActionArea>
                          </Grid>
                        ))}
                      </Grid>
                      {/* ))} */}
                    </Carousel>
                  )}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button onClick={handlePrevPageFT} disabled={page === 0}>
                      Trang trước
                    </Button>
                    <Button onClick={handleNextPageFT}>Trang sau</Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          </div>
        </section>

        <section id='it-job'>
          <div sx={{ justifyContent: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Box borderRadius={5} border={1} color={'#0d47a1'} margin={5} width={1000}>
                <Typography
                  variant='h4'
                  color={dark}
                  sx={{
                    backgroundColor: '#e3f2fd',
                    padding: 3,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                  }}
                >
                  Technology jobs
                </Typography>
                <Box
                  sx={{
                    borderRadius: 2,
                    marginTop: 5,
                    mx: 5,
                    marginBottom: 5,
                    px: 3,
                    paddingTop: 3,
                    paddingBottom: 2,
                    backgroundColor: '#F7F7F7',
                  }}
                >
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
                    <Carousel>
                      <Grid container spacing={2} columnSpacing={2} key={page}>
                        {jobsIT.map((job, index) => (
                          <Grid item xs={3} key={index}>
                            <CardActionArea onClick={() => inforJob(job)}>
                              <Card style={{ width: 200, height: 200 }}>
                                <Typography
                                  gutterBottom
                                  variant='h6'
                                  component='div'
                                  textAlign={'center'}
                                  margin={2}
                                >
                                  {job.title}
                                </Typography>
                                <Typography
                                  gutterBottom
                                  variant='h7'
                                  component='div'
                                  textAlign={'center'}
                                >
                                  <BusinessIcon style={{ color: 'gray', fontSize: 'medium' }} />
                                  {job.organizationDto.name}
                                </Typography>
                                <Typography
                                  gutterBottom
                                  variant='body1'
                                  component='div'
                                  textAlign={'center'}
                                  color={'#f44336'}
                                >
                                  <PaidIcon style={{ color: 'gray', fontSize: 'medium' }} />
                                  {job.salary} vnđ
                                </Typography>
                                <Typography
                                  gutterBottom
                                  variant='body2'
                                  component='div'
                                  textAlign={'center'}
                                >
                                  <LocationOnSharpIcon
                                    style={{ color: 'gray', fontSize: 'medium' }}
                                  />
                                  {job.organizationDto.location}
                                </Typography>
                              </Card>
                            </CardActionArea>
                          </Grid>
                        ))}
                      </Grid>
                      {/* ))} */}
                    </Carousel>
                  )}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button onClick={handlePrevPageIT} disabled={page === 0}>
                      Trang trước
                    </Button>
                    <Button onClick={handleNextPageIT}>Trang sau</Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          </div>
        </section>
      </section>
    </ThemeProvider>
  );
}

export default AllJobs;
