import { Link, useNavigate } from 'react-router-dom';
import * as React from 'react';
import ApplicantService from '../../services/applicant.js';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Unstable_Grid2';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea, SvgIcon } from '@mui/material';
import Stack from '@mui/material/Stack';
import Carousel from 'react-material-ui-carousel';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../App.jsx';
import CircularProgress from '@mui/material/CircularProgress';
import { dark } from '@mui/material/styles/createPalette.js';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import Footer from './Footer.jsx';
const pages = ['Jobs', 'Company'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Jobs() {
  const navigate = useNavigate();
  const user = useContext(UserContext);
  const [org, setOrg] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const images = [
    'https://www.vietnamworks.com/_next/image?url=https%3A%2F%2Fimages.vietnamworks.com%2Flogo%2Flazada_hr3bn_105082.png&w=3840&q=75',
    'https://www.vietnamworks.com/_next/image?url=https%3A%2F%2Fimages.vietnamworks.com%2Flogo%2Fchailease_hrbn1_122576.jpg&w=3840&q=75',
    'https://www.vietnamworks.com/_next/image?url=https%3A%2F%2Fimages.vietnamworks.com%2Flogo%2FMondelez_hrbn_123314.jpg&w=3840&q=75',
  ];

  const BackgroundSlider = () => {
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

    return (
      <Slider {...settings}>
        {images.map((image) => (
          <div
            key={image}
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <img src={image} style={{ opacity: 0.5 }} width={1500} alt='' />
          </div>
        ))}
      </Slider>
    );
  };

  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const getOrganization = async () => {
    try {
      const response = await ApplicantService.getOrganizationInHCM();
      setOrg(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrganization();
  }, []);

  console.log(user);
  const clickOrganization = (organi) => {
    navigate(`/organizations/${organi.id}`);
  };
  const GetJobRecommend = async () => {
    setIsLoading(true);
    const res = await ApplicantService.getRecommendJobByApplicantId(user.user.account_id, page);
    setJobs(res.data);
    setIsLoading(false);
  };
  useEffect(() => {
    GetJobRecommend();
  }, [page]);
  console.log(jobs);

  const inforJob = (job) => {
    navigate(`/jobs/${job.id}`);
  };

  const handleSearch = () => {
    event.preventDefault();
    // Lấy giá trị của thanh tìm kiếm
    const search = document.querySelector('input[aria-label="Enter job title"]').value;
    // Điều hướng đến trang kết quả tìm kiếm và truyền giá trị của thanh tìm kiếm vào đường dẫn URL
    console.log(search);
    navigate(`/search`, { state: search});
    
  };

  return (
    <>
      {/* <Typography variant='h1'>Candidate</Typography> */}

      <Box
        id='background-image&searchbar'
        position={'relative'}
        sx={{
          position: 'relative',
          width: '100%',
          height: 600,
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1,
          }}
        >
          <BackgroundSlider />
        </Box>
        <Box display='flex' justifyContent='center' alignItems='center'>
          <Box
            id='search-bar'
            width={1000}
            sx={{
              flexGrow: 1,
              maxWidth: 600,
              minWidth: 120,
              m: 10,
              marginTop: 10,
              px: 2,
              py: 15,
            }}
            display='flex'
            flexDirection='column'
            alignItems='center'
            component='form'
            noValidate
            autoComplete='off'
            borderRadius={5}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 2,
                borderRadius: 2,
                backgroundColor: 'rgb(0 0 0 / 40%)',
              }}
            >
              <Paper
                component='form'
                sx={{
                  p: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  width: 700,
                }}
              >
                <SearchOutlinedIcon></SearchOutlinedIcon>
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder='Enter job title'
                  inputProps={{ 'aria-label': 'Enter job title' }}
                />
                <Divider
                  orientation='vertical'
                  flexItem
                  variant='middle'
                  sx={{ backgroundColor: '' }}
                />
                <FormControl
                  sx={{
                    'minWidth': 200,
                    'border': 0,
                    '& .MuiInput-underline:before': {
                      borderBottom: 'none',
                    },
                    '& .MuiInput-underline:after': {
                      borderBottom: 'none',
                    },
                  }}
                  variant='standard'
                >
                  <Select
                    id='city-select'
                    displayEmpty
                    value={age}
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'Select city' }}
                  >
                    <MenuItem disabled value=''>
                      <em>Select city</em>{' '}
                    </MenuItem>
                    <MenuItem value={10}>Cần Thơ</MenuItem>
                    <MenuItem value={20}>Đà Nẵng</MenuItem>
                    <MenuItem value={30}>Hà Nội</MenuItem>
                    <MenuItem value={30}>Hải Phòng</MenuItem>
                    <MenuItem value={30}>Hồ Chí Minh</MenuItem>
                  </Select>
                </FormControl>
              </Paper>
              <Button
                variant='contained'
                sx={{ marginLeft: 3, backgroundColor: '#FF7D55', p: '10px' }}
                onClick={() => handleSearch()}
              >
                Search
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box id='top-cty' sx={{ px: 5, py: 5, backgroundColor: '#F7F7F7' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant='h4' margin={2}>
            Recommended organizations in Ho Chi Minh
          </Typography>
          <Link component='button' variant='body2' color='inherit' onClick={() => handleSearch()}>
            Xem thêm
          </Link>
        </Box>
        <Stack direction='row' spacing={2}>
          {org.slice(0, 5).map((organization, index) => (
            <Card sx={{ width: 1, height: 450 }}>
              <CardActionArea>
                <CardMedia
                  component='img'
                  height='250'
                  image='https://www.upenn.edu/themes/custom/penn_global/assets/img/simplified-shield.ico'
                  alt=''
                  onClick={() => clickOrganization(organization)}
                />
              </CardActionArea>
              <CardContent>
                <Typography
                  gutterBottom
                  variant='h5'
                  component='div'
                  textAlign={'center'}
                  sx={{ height: 60, pt: 1 }}
                  onClick={() => clickOrganization(organization)}
                >
                  {organization.name}
                </Typography>
                <Typography variant='body1' color='text.secondary' textAlign={'center'}>
                  {organization.location}
                </Typography>
                <Typography variant='body2' color='text.secondary' textAlign={'center'}>
                  {organization.industry}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Box>
      <section id='recommend-job'>
        <div sx={{ justifyContent: 'center' }}>
          <Box borderRadius={5} border={1} color={'#0d47a1'} margin={5}>
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
                          <Card style={{ width: 300, height: 150 }}>
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
                              {job.organizationDto.name}
                            </Typography>
                            <Typography
                              gutterBottom
                              variant='body1'
                              component='div'
                              textAlign={'center'}
                            >
                              {job.salary} vnđ
                            </Typography>
                            <Typography
                              gutterBottom
                              variant='body2'
                              component='div'
                              textAlign={'center'}
                            >
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
        </div>
      </section>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <img src='https://images.vietnamworks.com/logo/woori_cpbn_117981.png' width={1400} />
      </div>

    </>
  );
}

export default Jobs;
