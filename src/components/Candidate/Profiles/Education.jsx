import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import React, { useState } from 'react';

export function Education({ education }) {
  const [open, setOpen] = useState(false);
  const { universityName, location, degree, major, startDate, completionDate, gpa } = education;
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <ListItemButton onClick={() => setOpen(!open)}>
        <ListItemText primary={universityName} secondary={`${degree} - ${major}`} />
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
          {completionDate && (
            <ListItem sx={{ pl: 4 }}>
              <ListItemText
                primary={`Completion Date: ${new Date(completionDate).toLocaleDateString()}`}
              />
            </ListItem>
          )}
          {gpa && (
            <ListItem sx={{ pl: 4 }}>
              <ListItemText primary={`GPA: ${gpa}`} />
            </ListItem>
          )}
        </List>
      </Collapse>
    </List>
  );
}
