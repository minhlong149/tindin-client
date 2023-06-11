import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';

export function JobsSideBar({ jobs, setJobIndex }) {
  return (
    <List sx={{ bgcolor: 'background.paper' }}>
      {jobs.map((job, index) => (
        <ListItem key={job.id} disablePadding>
          <ListItemButton onClick={() => setJobIndex(index)}>
            <ListItemText primary={job.title} secondary={job.jobType} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
