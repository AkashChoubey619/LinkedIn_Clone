import React, { useContext } from 'react'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { messageExamples } from './Store';
import { Typography } from '@mui/material';
import Nav from '../Header/Navigation';
import Context from '../ContextApi/MainContext';


function refreshMessages() {
  const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));

  return Array.from(new Array(50)).map(
    () => messageExamples[getRandomInt(messageExamples.length)],
  );
}

export default function Message() {
  const [value, setValue] = React.useState(0);
  const ref = React.useRef(null);
  const { mode } = useContext(Context)
  const [messages, setMessages] = React.useState(() => refreshMessages());

  React.useEffect(() => {
    ref.current.ownerDocument.body.scrollTop = 0;
    setMessages(refreshMessages());
  }, [value, setMessages]);

  return (
    <>
      <Nav />
      <div style={{ position: 'absolute', padding: '15px', top: '6%', left: '8%' }} >
        <Box sx={{ pb: 7 }} ref={ref}>
          <Typography 
          sx={{ textShadow: ' 3px 3px 20px #ff99cc,-2px 1px 30px #ff99cc', textAlign: 'center', color: 'white' }} mt={2} variant='h3'>
            ---Inbox---
          </Typography>
          <List >
            {messages.map(({ primary, secondary, person }, index) => (
              <ListItemButton key={index + person}
                sx={mode ? { bgcolor: 'black', color: 'white', mb: '5px', borderRadius: '6px' } :
                  { bgcolor: 'white', mb: '5px', borderRadius: '6px' }} >
                <ListItemAvatar >
                  <Avatar alt="Profile Picture" src={person} />
                </ListItemAvatar>
                <ListItemText primary={primary} secondary={secondary} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </div>
    </>
  )
}
