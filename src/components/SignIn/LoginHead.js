import React, { useState } from 'react'
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import './Style.css'
import { Link} from 'react-router-dom';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

export default function LoginHead() {
  const [signToggle,setSignToggle]= useState(true);
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const isSmScreen = useMediaQuery(theme.breakpoints.up('sm'));

 
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
  //  setTimeout(()=>setOpen(false),3000)
  // const SignIn=()=>{
  //   const navigate=useNavigate();
  //   setSignToggle(false);
  //    navigate('/home')
  // }


  return (
    <Container >
      <Container className='login-nav' id='login-head'>
        <div className='login-nav' id='logo-name'>
          <Link className='login-nav link-txt' to='/' onClick={()=>setSignToggle(true)}>
          <h1 id='login-title'>Linked</h1>
          <LinkedInIcon id='login-logo' />
          </Link>
        </div>
        <div className='login-nav' id='join-signup'>
          {isSmScreen&&(<div>{open && <Alert severity="info">Login Your Account</Alert>}</div>)}
          <Button onClick={handleClick(TransitionUp)} className='login-left' id='joinUs'>Join Now</Button>
          <Snackbar
        open={open}
        onClose={handleClose}
        TransitionComponent={transition}
        message="This Feature is currently unavailable"
        key={transition ? transition.name : ''}
      />
          <Divider className='login-left' orientation='vertical' flexItem />
          <h4 className='login-left'>
            {
            signToggle?<Link className='link-txt' onClick={()=>setSignToggle(false)} to='/signup'>
            <button id='signUp-btn' type='button'>Sign Up
            </button></Link>:'Create Account'}
          </h4>
        </div> 
      </Container>
    </Container>
  )
}
