import React, { useContext } from 'react'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import RightSection from '../main/RightSection';
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import { messageExamples } from './Store';
import { Paper, Stack, Typography, useMediaQuery } from '@mui/material';
import Nav from '../Header/Navigation';
import Context from '../ContextApi/MainContext';
import { Link } from 'react-router-dom';


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
  const theme = useTheme();
    const isSmScreen = useMediaQuery(theme.breakpoints.up('sm'))

  React.useEffect(() => {
    setMessages(refreshMessages());
  }, [value, setMessages]);

  return (
    <>
      <Nav />
      <Stack gap={'20px'} flexDirection={'row'} className='jobs' sx={{ position: 'absolute', top: '55px' }}>

        <Box width={'800px'} >
          <Paper
            sx={mode ? {
              backgroundColor: 'black',
              padding: 2,
              borderRadius: 2,
              color: 'white',
              boxShadow: '0px 0px 4px gray',
              mt: 2 // Adjust the maximum width to fit within the viewport
            } : {
              backgroundColor: 'white',
              boxShadow: (theme) => theme.shadows[3],
              padding: 2,
              borderRadius: 2,
              mt: 2 // Adjust the maximum width to fit within the viewport
            }}
          >
            <Typography variant='h6'>
              All Messages
            </Typography>
          </Paper>
          {<List >
            {messages.map(({ primary, secondary, person }, index) => (
              <Link to='/viewMessage'><Box key={index + person}
                sx={mode ? { bgcolor: 'black', color: 'white', borderRadius: '6px',display:'flex',p:2,'&:hover':{bgcolor:'grey'}  } :
                  { bgcolor: 'white',color:'black', borderRadius: '6px',display:'flex',p:2,'&:hover':{bgcolor:'lightblue'} }} >
                <ListItemAvatar >
                  <Avatar alt="Profile Picture" src={person} />
                </ListItemAvatar>
                <Box>
                <Typography display={'block'} variant='body1'>{primary}</Typography>
                
                <Typography display={'block'} variant='body2'>{secondary}</Typography>
                </Box>
              </Box>
              </Link>
            ))}
          </List>
          }
        </Box>
        {isSmScreen && <RightSection />}
      </Stack>
    </>
  )
}
