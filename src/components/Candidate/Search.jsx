import { useState } from 'react';
import {
  Box,
  Button,
  Paper,
  InputBase,
  FormControl,
  MenuItem,
  Select,
  Divider,
} from '@mui/material';
import JobService from '../../services/job.js';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOrganizations, setFilteredOrganizations] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [city, setCity] = useState('');

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

    JobService.searchJobs(searchTerm)
      .then((jobs) => {
        const filteredJobs = jobs.filter((job) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()),
        );
        setFilteredJobs(filteredJobs);
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
                    <em>Select city</em>{' '}
                  </MenuItem>
                  <MenuItem value={10}>cần Thơ</MenuItem>
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
              onClick={handleSearch}
            >
              Search
            </Button>
          </Box>
        </Box>
      </Box>

      <div>
        <h2>Filtered Organizations:</h2>
        {isLoading ? (
          <p>Loading organizations...</p>
        ) : filteredOrganizations.length > 0 ? (
          <ul>
            {filteredOrganizations.map((org) => (
              <li key={org.id}>{org.name}</li>
            ))}
          </ul>
        ) : (
          <p>No organizations found.</p>
        )}
      </div>

      <div>
        <h2>Filtered Jobs:</h2>
        {isLoading ? (
          <p>Loading jobs...</p>
        ) : filteredJobs.length > 0 ? (
          <ul>
            {filteredJobs.map((job) => (
              <li key={job.id}>{job.title}</li>
            ))}
          </ul>
        ) : (
          <p>No jobs found.</p>
        )}
      </div>
    </div>
  );
}

export default Search;
