import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Nav from '../Header/Navigation';
import Context from '../ContextApi/MainContext';
import LoginHead from '../SignIn/LoginHead'




// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function NotAvailable() {
  const { mode } = React.useContext(Context)
  const token =  localStorage.getItem("token");

  function Copyright () {
    return (
      <Typography variant="body2" sx={mode&&{color:'white'}} color="text.secondary">
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  console.log(token === null ? "Rendering LoginHead" : "Rendering Nav",localStorage.getItem("token"));
  return (
    <ThemeProvider theme={defaultTheme}>
      {
        
        token === 'null' ?   <LoginHead/> : <Nav />
      }
      <Box
        sx={mode?{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          bgcolor:'black',color:'white'
        }:{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          bgcolor:'white'
        }}
      >
        <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
          <Typography variant="h2" component="h1" gutterBottom>
            Coming soon...
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            {'This feature is not implemented yet.'}
            {'This may add in future, So stay tuned'}
          </Typography>
          <Typography variant="body1">Be Patience.</Typography>
          <div className={mode?'darkNormalIcon':'normalIcon'}></div> 
          
        </Container>
        <Box
          component="footer"
          sx={mode?
            {
              py: 3,
              px: 2,
              mt: 'auto',
              backgroundColor: 'black',color:'white',boxShadow:'0px -1px 4px white' 
            }:{
            py: 3,
            px: 2,
            mt: 'auto',
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[200]
                : theme.palette.grey[800],
          }}
        >
          <Container sx={mode&&{background:'black'}} maxWidth="sm">
            <Typography variant="body1">
              My sticky footer can be found here.
            </Typography>
           
            <Copyright  />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}