import React, { useState, useContext } from 'react';
import {
  Box,
  Button,
  Paper,
  InputBase,
  FormControl,
  MenuItem,
  Select,
  Divider,
  Typography,
  Card,
  CardActionArea,
  Grid,
  Tabs,
  Tab,
} from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import JobService from '../../services/job.js';
import { UserContext } from '../../App.jsx';
import { useLocation} from 'react-router-dom';

function Search() {
  const user = useContext(UserContext);
  const { state: search } = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOrganizations, setFilteredOrganizations] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [city, setCity] = useState('');
  const [value, setValue] = useState(0);

  const handleSearch = () => {
    setIsLoading(true);

    JobService.searchOrganizations(searchTerm)
      .then((organizations) => {
        const filteredOrgs = organizations.filter((org) =>
          org.name.toLowerCase().includes(searchTerm.toLowerCase()),
        );
        setFilteredOrganizations(filteredOrgs);
      })
      .catch((error) => {
        console.error('Error searching organizations:', error);
        setFilteredOrganizations([]);
      });

    JobService.searchJobs(searchTerm, user.user.account_id)
      .then((jobs) => {
        setFilteredJobs(jobs);
      })
      .catch((error) => {
        console.error('Error searching jobs:', error);
        setFilteredJobs([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleChange = (event) => {
    setCity(event.target.value);
  };

  const inforJob = (job) => {
    navigate(`/jobs/${job.id}`);
  };

  return (
    <div>
      <Box display='flex' justifyContent='center' alignItems='center'>
        <Box
          id='search-bar'
          width={1000}
          sx={{
            flexGrow: 1,
            maxWidth: 600,
            minWidth: 120,
            m: 5,
            px: 2,
            py: 2,
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
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder='Enter job title'
                inputProps={{ 'aria-label': 'Enter job title' }}
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
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
                  value={city}
                  onChange={handleChange}
                  inputProps={{ 'aria-label': 'Select city' }}
                >
                  <MenuItem disabled value=''>
                    <em>Select city</em>
                  </MenuItem>
                  <MenuItem value={10}>Cần Thơ</MenuItem>
                  <MenuItem value={20}>Đà Nẵng</MenuItem>
                  <MenuItem value={30}>Hà Nội</MenuItem>
                  <MenuItem value={40}>Hải Phòng</MenuItem>
                  <MenuItem value={50}>Hồ Chí Minh</MenuItem>
                </Select>
              </FormControl>
            </Paper>
            <Button
              variant='contained'
              sx={{ marginLeft: 3, backgroundColor: '#FF7D55', p: '10px' }}
              onClick={handleSearch}
            >
              Search
            </Button>
          </Box>
        </Box>
      </Box>

      <Card sx={{ width: '100%', mx: 5 }}>
        <Tabs value={value} onChange={(event, newValue) => setValue(newValue)}>
          <Tab label='Organizations' />
          <Tab label='Jobs' />
        </Tabs>

        <TabPanel value={value} index={0}>
          <div>
            <Typography variant='h6' align='center' mt={2}>
              Filtered Organizations:
            </Typography>
            {isLoading ? (
              <Typography variant='body1' align='center'>
                Loading organizations...
              </Typography>
            ) : filteredOrganizations.length > 0 ? (
              <ul>
                {filteredOrganizations.map((org) => (
                  <li key={org.id}>
                    <Typography variant='body1'>{org.name}</Typography>
                  </li>
                ))}
              </ul>
            ) : (
              <Typography variant='body1' align='center'>
                No organizations found.
              </Typography>
            )}
          </div>
        </TabPanel>

        <TabPanel value={value} index={1}>
          <div>
            <Typography variant='h6' align='center' mt={2}>
              Filtered Jobs:
            </Typography>
            {isLoading ? (
              <Typography variant='body1' align='center'>
                Loading jobs...
              </Typography>
            ) : filteredJobs.length > 0 ? (
              <Carousel>
                <Grid container spacing={2} columnSpacing={2} key={page}>
                  {filteredJobs.map((job, index) => (
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
              </Carousel>
            ) : (
              <Typography variant='body1' align='center'>
                No jobs found.
              </Typography>
            )}
          </div>
        </TabPanel>
      </Card>
    </div>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default Search;
