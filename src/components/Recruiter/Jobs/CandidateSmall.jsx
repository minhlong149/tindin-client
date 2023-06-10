import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Avatar from '@mui/material/Avatar';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export function CandidateSmall({ candidate }) {
  const [open, setOpen] = useState(true);
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <ListItemButton onClick={() => setOpen(!open)}>
        <ListItemAvatar>
          <Avatar
            alt={`${candidate.user.firstName} ${candidate.user.lastName}`}
            src={candidate.user.profileUrl} />
        </ListItemAvatar>
        <ListItemText
          primary={`${candidate.user.firstName} ${candidate.user.lastName}`}
          secondary={<Typography
            sx={{ display: 'inline' }}
            component='span'
            variant='body2'
            color='text.primary'
          >
            {`${candidate.experienceLevel} ${candidate.title}`}
          </Typography>} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={open} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          <ListItem as={Link} to={`/candidates/${candidate.user.accountId}`}>
            {candidate.preferLocation && (
              <ListItemText primary={candidate.preferLocation} secondary='Location' />
            )}

            {candidate.experiences.length > 0 && (
              <ListItemText
                primary={candidate.experiences.map(({ title }) => title).join(', ')}
                secondary='Experiences' />
            )}

            {candidate.skills.length > 0 && (
              <ListItemText
                primary={candidate.skills.map(({ skill }) => skill).join(', ')}
                secondary='Skills' />
            )}
          </ListItem>
        </List>
      </Collapse>
    </List>
  );
}
