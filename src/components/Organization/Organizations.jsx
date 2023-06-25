import React, { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea, SvgIcon } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import OrganizationService from '../../services/organization.js'
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LanguageIcon from '@mui/icons-material/Language';
import { Link, useNavigate } from 'react-router-dom';
function Organizations() {
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
  const navigate = useNavigate();
  const [org, setOrg] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
   const GetOrganization = async () => {
     setIsLoading(true);
     const res = await OrganizationService.getOrganization();
     setOrg(res);
     setIsLoading(false);
   };
   useEffect(() => {
     GetOrganization();
   }, []);


   const handleSearch = async () => {
     // Điều hướng đến trang kết quả tìm kiếm và truyền giá trị của thanh tìm kiếm vào đường dẫn URL
     setIsLoading(true);
     const res = await OrganizationService.getOrganizationByName(searchValue);
     setOrg(res);
     setIsLoading(false);
     
  };
  
   const inforOrg = (org) => {
     navigate(`/organizations/${org.id}`);
   };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          m: 5,
          p: 5,
          px: 10,
          marginLeft: 10,
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
      >
        <Typography
          variant='h5'
          style={{ fontWeight: 'bold', textTransform: 'uppercase', color: '#1976d2' }}
        >
          Discover Company Culture
        </Typography>
        <Typography
          variant='body2'
          style={{ fontWeight: 'lighter', color: '#1976d2' }}
          flexDirection={'column'}
        >
          Find out about the company culture and choose the most suitable workplace for you.
        </Typography>

        <Box flexDirection={'column'} sx={{ marginTop: 2 }}>
          <Box
            id='search-bar'
            display='flex'
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
                padding: 1,
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
                  width: 500,
                  height: 30,
                }}
              >
                <SearchOutlinedIcon></SearchOutlinedIcon>
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  style={{ fontSize: 12 }}
                  placeholder='Enter organization name'
                  inputProps={{ 'aria-label': 'Enter organization name' }}
                  value={searchValue}
                  onChange={(event) => setSearchValue(event.target.value)}
                />
              </Paper>
              <Button
                variant='contained'
                style={{ fontSize: 14 }}
                sx={{ marginLeft: 2, backgroundColor: '#FF7D55', p: '4px' }}
                onClick={() => handleSearch()}
              >
                Search
              </Button>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            marginTop: 5,
            padding: 5,
            backgroundColor: '#FFFFFF',
            border: 1,
            borderRadius: 2,
            borderColor: 'rgba(51, 51, 51, 0.08)',
          }}
        >
          <Typography variant='h5' paddingBottom={5} style={{ fontWeight: '' }}>
            All Organizations
          </Typography>
          {isLoading ? (
            <Box
              sx={{
                px: 5,
                py: 5,
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <Grid container spacing={2} columnSpacing={2}>
              {org.map((org, index) => (
                <Grid item xs={4} key={index}>
                  <CardActionArea onClick={() => inforOrg(org)}>
                    <Card style={{ width: 330, height: 250, marginLeft: 2 }}>
                      <CardMedia
                        sx={{ height: 80 }}
                        image='https://source.unsplash.com/random/?Cryptocurrency&1'
                        title='green iguana'
                      />
                      <Typography gutterBottom variant='h6' component='div' marginTop={1} marginLeft={1}>
                        {org.name}
                      </Typography>
                      <Typography gutterBottom variant='h7' component='div'>
                        <FolderCopyIcon
                          style={{ color: 'gray', fontSize: 'medium' }}
                          sx={{ mx: 1 }}
                        />
                        {org.industry}
                      </Typography>
                      <Typography gutterBottom variant='h7' component='div'>
                        <LocationOnIcon
                          style={{ color: 'gray', fontSize: 'medium' }}
                          sx={{ mx: 1 }}
                        />
                        {org.location}
                      </Typography>
                      <Link
                        gutterBottom
                        variant='h7'
                        component='div'
                        style={{ textDecoration: 'none', color: 'inherit' }}
                      >
                        <LanguageIcon
                          style={{ color: 'gray', fontSize: 'medium' }}
                          sx={{ mx: 1 }}
                        />
                        {org.website}
                      </Link>
                    </Card>
                  </CardActionArea>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Organizations