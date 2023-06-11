import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';

import { AppliedCandidates } from './AppliedCandidates.jsx';
import { RecommendedCandidates } from './RecommendedCandidates.jsx';

export function SelectedJob({ job }) {
  const [value, setValue] = useState(0);
  return (
    <Card>
      <CardContent>
        <Typography variant='h5' component='div'>
          {job.title}
        </Typography>
      </CardContent>

      <Tabs value={value} onChange={(event, newValue) => setValue(newValue)}>
        <Tab label='Applied' />
        <Tab label='Recommended' />
      </Tabs>

      <TabPanel value={value} index={0}>
        <AppliedCandidates jobId={job.id} />
      </TabPanel>

      <TabPanel value={value} index={1}>
        <RecommendedCandidates jobId={job.id} />
      </TabPanel>
    </Card>
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


