import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { Experience } from './Experience.jsx';

export function ExperiencesInfo({ experiences }) {
  if (experiences.length === 0) return <> </>;
  const [expanded, setExpanded] = useState(true);
  return (
    <Accordion
      expanded={expanded}
      onChange={() => setExpanded(!expanded)}
      sx={{
        width: '100%',
        maxWidth: '800px',
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography sx={{ width: '20%', flexShrink: 0 }}>Experiences</Typography>
        {!expanded && (
          <Typography sx={{ color: 'text.secondary' }}>
            {experiences.map((experience) => experience.title).join(', ')}
          </Typography>
        )}
      </AccordionSummary>
      <AccordionDetails>
        <Box
          sx={{
            width: '100%',
            bgcolor: 'background.paper',
          }}
        >
          {experiences.map((experience, index) => (
            <>
              <Experience key={experience.id} experience={experience} />
              {index !== experience.length - 1 && <Divider />}
            </>
          ))}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}
