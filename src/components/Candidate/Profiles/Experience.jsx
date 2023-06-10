import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import React, { useState } from 'react';

export function Experience({ experience }) {
  const [open, setOpen] = useState(false);
  const {
    organization: { name, location },
    title,
    experienceLevel,
    startDate,
    endDate,
    accomplishment,
  } = experience;
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <ListItemButton onClick={() => setOpen(!open)}>
        <ListItemText primary={`${experienceLevel} ${title}`} secondary={name} />
        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItemButton>
      <Collapse in={open} timeout='auto' unmountOnExit>
        <List disablePadding>
          {location && (
            <ListItem sx={{ pl: 4 }}>
              <ListItemText primary={`Location: ${location}`} />
            </ListItem>
          )}
          {startDate && (
            <ListItem sx={{ pl: 4 }}>
              <ListItemText primary={`Start Date: ${new Date(startDate).toLocaleDateString()}`} />
            </ListItem>
          )}
          {endDate && (
            <ListItem sx={{ pl: 4 }}>
              <ListItemText primary={`End Date: ${new Date(endDate).toLocaleDateString()}`} />
            </ListItem>
          )}
          {accomplishment && (
            <ListItem sx={{ pl: 4 }}>
              <ListItemText primary={`Accomplishment: ${accomplishment}`} />
            </ListItem>
          )}
        </List>
      </Collapse>
    </List>
  );
}
