import React, { useContext, useEffect, useState } from 'react'
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import './Style.css'
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import { useTheme } from '@mui/material/styles';
import { Stack, createTheme, useMediaQuery } from '@mui/material';
// import Article from '@mui/icons-material/Article';
import People from '@mui/icons-material/Group';
import Learning from '@mui/icons-material/CastForEducation';
import Jobs from '@mui/icons-material/Work';
import Context from '../ContextApi/MainContext';
import Article from '@mui/icons-material/NewspaperOutlined';

export default function LoginHead() {
  const theme = createTheme({
    breakpoints: {
      values: {
        forIcon: 750,
        sm: 600,
        md: 900,
      },
    },
  });
  const [signToggle, setSignToggle] = useState(true);
  const [open, setOpen] = React.useState(false);
  const { setMode } = useContext(Context)
  const isSmScreen = useMediaQuery(theme.breakpoints.up('sm'));
  const forIcon = useMediaQuery(theme.breakpoints.up('forIcon'));
  const forIconMOb = useMediaQuery(theme.breakpoints.down('forIcon'));


  const [transition, setTransition] = React.useState(undefined);

  const handleClick = (Transition) => () => {
    setTransition(() => Transition);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function TransitionUp(props) {
    return <Slide {...props} direction="down" />;
  }

  
useEffect(()=>{
  setMode(false)
},[signToggle])

  return (
    <Container sx={{ mt: '10px',pb:'10px' }} >
      <Container className='login-nav' id='login-head'>
        <div className='login-nav' id='logo-name'>
          <Link className='login-nav link-txt' to='/' onClick={() => setSignToggle(true)}>
            <h1 id='login-title'>Linked</h1>
            <LinkedInIcon id='login-logo' />
          </Link>
        </div>
        <div className='login-nav' id='join-signup'>
          {forIcon &&
            <Stack direction="row" alignItems='center' spacing={2} m={0.8}>
              <div >
                <Link to='/notAvailable' className={'icon'} ><Article sx={{ fontSize: '26px' }} />
                  {forIcon && (
                    <div className='iconFont'>Articles</div>
                  )}
                </Link></div>
              <div >
                <Link to='/notAvailable' className={'icon'}><People sx={{ fontSize: '26px' }} />
                  {forIcon && (
                    <div className='iconFont'>Peoples</div>
                  )}
                </Link>
              </div>
              <div >
                <Link to='/notAvailable' className={'icon'}><Learning sx={{ fontSize: '26px' }} />
                  {forIcon && (
                    <div className='iconFont'>Learning</div>
                  )}
                </Link>
              </div>
              <div >
                <Link to='/notAvailable' className={'icon'}><Jobs sx={{ fontSize: '26px' }} />
                  {forIcon && (
                    <div className='iconFont'>Jobs</div>
                  )}
                </Link>
              </div>
            </Stack>}
          {forIcon && <Divider className='login-left' height={'50px'} orientation='vertical' flexItem />}
          { signToggle ?<Button onClick={handleClick(TransitionUp)} className='login-left' id='joinUs'>Join now</Button>
          :<Link to='/'><Button className='login-left' onClick={() => setSignToggle(true)} id='joinUs'>login</Button></Link>}
          <Snackbar
            open={open}
            onClose={handleClose}
            TransitionComponent={transition}
            message="This Feature is currently unavailable"
            key={transition ? transition.name : ''}
          />
          <Divider className='login-left' height={'50px'} orientation='vertical' flexItem />
          <h4 className='login-left' onClick={() => {setSignToggle(false) }}>
            {
              signToggle ?  (
                <Link className='link-txt'  to='/signup'>
                  <span id='signUp-btn'>Sign Up</span>
                </Link>
              ) : (
                <span>Create Account</span>
              )}
          </h4>
        </div>
      </Container>
      {forIconMOb&&<Stack justifyContent={'center'} direction="row" alignItems='center' pb={'10px'} spacing={2}>
              <div >
                <Link to='/notAvailable' className={'icon'} ><Article sx={{ fontSize: '26px' }} />
                    <div className='iconFont'>Articles</div>

                </Link></div>
              <div >
                <Link to='/notAvailable' className={'icon'}><People sx={{ fontSize: '26px' }} />
                  
                    <div className='iconFont'>Peoples</div>
                  
                </Link>
              </div>
              <div >
                <Link to='/notAvailable' className={'icon'}><Learning sx={{ fontSize: '26px' }} />
                  
                    <div className='iconFont'>Learning</div>
                  
                </Link>
              </div>
              <div >
                <Link to='/notAvailable' className={'icon'}><Jobs sx={{ fontSize: '26px' }} />
                  
                    <div className='iconFont'>Jobs</div>
                  
                </Link>
              </div>
            </Stack>}
    </Container>
  )
}
