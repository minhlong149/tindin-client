import { Link, useNavigate } from 'react-router-dom';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import Stack from '@mui/material/Stack';
import Carousel from 'react-material-ui-carousel';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../App.jsx';
import { Label, WidthFull } from '@mui/icons-material';

const pages = ['Việc làm', 'Công ty'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Jobs() {
  const navigate = useNavigate();
  const user = useContext(UserContext);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [data, setData] = useState([]);
  const [jobs, setJobs] = useState([]);
   const handleOpenNavMenu = (event) => {
     setAnchorElNav(event.currentTarget);
   };
   const handleOpenUserMenu = (event) => {
     setAnchorElUser(event.currentTarget);
   };

   const handleCloseNavMenu = () => {
     setAnchorElNav(null);
   };

   const handleCloseUserMenu = () => {
     setAnchorElUser(null);
   };

   const handleLogout = () => {
     // Thêm logic đăng xuất ở đây
     loginServices.removeUserFromLocalStorage();
     setUser(null);
   };
   const [age, setAge] = React.useState('');

   const handleChange = (event) => {
     setAge(event.target.value);
  };

   const settingsSlider = {
     dots: true,
     infinite: true,
     speed: 500,
     slidesToShow: 1,
     slidesToScroll: 1,
   };
   
   useEffect(() => {
     fetch('/api/organizations?location=Hồ Chí Minh')
       .then((response) => response.json())
       .then((data) => setData(data));
   }, []);
  console.log(data);
  console.log(user);
  const clickOrganization = (organi) => {
     navigate(`/organizations/${organi.id}`);
   }
  useEffect(() => {
    fetch(`/api/jobs?applicantId=${user.account_id}`)
      .then((response) => response.json())
      .then((data) => setJobs(data));
  }, []);
  console.log(jobs);
  return (
    <>
      {/* <Typography variant='h1'>Candidate</Typography> */}
      <AppBar position='static'>
        <Container maxWidth='xl'>
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant='h6'
              noWrap
              component='a'
              href='/'
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Tindin
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size='large'
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleOpenNavMenu}
                color='inherit'
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id='menu-appbar'
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign='center'>{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant='h5'
              noWrap
              component='a'
              href=''
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Tindin
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title='Open settings'>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt='Remy Sharp' src='/static/images/avatar/2.jpg' />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id='menu-appbar'
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) =>
                  setting === 'Logout' ? (
                    <MenuItem key={setting} onClick={handleLogout}>
                      <Typography textAlign='center'>{setting}</Typography>
                    </MenuItem>
                  ) : (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign='center'>{setting}</Typography>
                    </MenuItem>
                  ),
                )}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Box
        id='search-bar'
        sx={{
          flexGrow: 1,
          maxWidth: 600,
          minWidth: 120,
          m: 5,
          px: 2,
          py: 2,
          backgroundColor: 'aliceblue',
        }}
        display='flex'
        flexDirection='column'
        alignItems='center'
        component='form'
        noValidate
        autoComplete='off'
        borderRadius={5}
      >
        <Grid container spacing={0} justifyContent={'center'} alignItems={'center'}>
          <Grid>
            <TextField
              fullWidth
              id='standard-basic'
              placeholder='Enter job title'
              variant='filled'
            />
          </Grid>
          <Grid >
            <FormControl fullWidth variant='filled'>
              <Select
                id='city-select'
                displayEmpty
                value={age}
                textAlign='center'
                onChange={handleChange}
              >
                <MenuItem disabled value=''>
                  <em>Select city</em>{' '}
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid>
            <Button sx={{ width: '100%' }} variant='contained'>
              Search
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Box id='top-cty' sx={{ px: 5, py: 5, backgroundColor: '#F7F7F7' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant='h4' margin={2}>
            Công ty nổi bật
          </Typography>
          <Link
            component='button'
            variant='body2'
            color='inherit'
            onClick={() => {
              // Xử lý sự kiện khi người dùng nhấp vào liên kết "Xem thêm"
            }}
          >
            Xem thêm
          </Link>
        </Box>
        <Stack direction='row' spacing={2}>
          {data.slice(0, 5).map((organization, index) => (
            <Card sx={{ width: 1, height: 400 }}>
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
        <div>
          <Typography variant='h4' margin={2}>
            Việc làm gợi ý
          </Typography>
          {/* <Carousel>
            {data.map((page, pageIndex) => (
              <Grid container key={pageIndex}>
                {page.map((card, cardIndex) => (
                  <Grid item xs={4} key={cardIndex}>
                    <Card>
                      <Typography gutterBottom variant='h5' component='div' textAlign={'center'}>
                        {card.title}
                      </Typography>
                      <Typography gutterBottom variant='h6' component='div' textAlign={'center'}>
                        {card.name}
                      </Typography>
                      <Typography gutterBottom variant='body1' component='div' textAlign={'center'}>
                        {card.salary}
                      </Typography>
                      <Typography gutterBottom variant='body1' component='div' textAlign={'center'}>
                        {card.local}
                      </Typography>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ))}
          </Carousel> */}
        </div>
      </section>
    </>
  );
}

export default Jobs;
