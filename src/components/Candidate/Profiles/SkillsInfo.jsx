import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';

export function SkillsInfo({ skills }) {
  if (skills.length === 0) return <> </>;
  const [expanded, setExpanded] = useState(false);
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
        <Typography sx={{ width: '20%', flexShrink: 0 }}>Skills</Typography>
        {!expanded && (
          <Typography sx={{ color: 'text.secondary' }}>
            {skills.map(({ skill }) => skill).join(', ')}
          </Typography>
        )}
      </AccordionSummary>
      <AccordionDetails>
        <Stack direction='row' spacing={1}>
          {skills.map(({ skill }) => (
            <Chip key={skill} label={skill} />
          ))}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}
