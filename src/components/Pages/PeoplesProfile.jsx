import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import { Avatar, Box, List, ListItem, ListItemText, Paper, Stack, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import { css } from '@mui/system';
import { Modal as BaseModal } from '@mui/base/Modal';
import Button from '@mui/material/Button';
import LeftSearchCard from './LeftSearchCard';
import Nav from '../Header/Navigation';
import Context from '../ContextApi/MainContext';
import { footers } from './Store';
import { useContext } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material/styles';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const defaultTheme = createTheme();

export default function MyProfile() {
  const  getId  = localStorage.getItem('getId');
  const [userData, setUserData] = React.useState([])
  const {mode}=useContext(Context);
  const theme = useTheme();
  const isMdScreen = useMediaQuery(theme.breakpoints.up('md'));
  const [openMore, setOpenMore] = React.useState(false);
  const handleMore = () => setOpenMore(true);
  const handleCloseMore = () => setOpenMore(false);


  const myInfo = async function () {
    try {
      const res = await fetch(`https://academics.newtonschool.co/api/v1/linkedin/user/${getId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          projectID: 'ut1dy4576cd1'
        },

      });

      if (res.ok) {
        const data = await res.json();
        setUserData(data.data);

      }
    } catch (error) {
      console.log('userDataError ', error)

    }

  }

  React.useEffect(() => {
    myInfo()
    window.scrollTo(0, 0)
  }, [])


  const handleClickFollow = async() => {
    try {
      const res = await fetch(`https://academics.newtonschool.co/api/v1/linkedin/follow/${userData._id}`, {
        method: userData.isFollowed?'DELETE':'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          projectID: 'ut1dy4576cd1'
        },

      });
      if (res.ok) {
        const data = await res.json();
        console.log(data.message)
        myInfo()
      }
      else{
        console.log( userData.isFollowed)
      }
    } catch (error) {
      console.log('userDataError ', error)
    }
  };

  const suggestionsData = [
    { id: 1, name: 'John Doe', occupation: 'Software Engineer' },
    { id: 2, name: 'Jane Smith', occupation: 'Data Scientist' },
    { id: 3, name: 'Alice Johnson', occupation: 'Product Manager' },
    // Add more suggestions as needed
  ];




  const Suggestion = ({ suggestion }) => {
    const [isFollowing, setIsFollowing] = React.useState(false);

    const handleFollowToggle = () => {
      setIsFollowing(prevState => !prevState);
    };

    return (
      <Paper elevation={3} sx={mode?{ p: 2, borderRadius: '8px',background:'black',color:'white',boxShadow:"0px 0px 4px white"  }:{ p: 2, borderRadius: '8px' }}>
        <Avatar></Avatar>
        <Typography variant="h6">{suggestion.name}</Typography>
        <Typography variant="body1" sx={mode&&{color:'white'}} color="textSecondary">
          {suggestion.occupation}
        </Typography>
        <Button
          variant={isFollowing ? 'outlined' : 'contained'}
          color={isFollowing ? 'secondary' : 'primary'}
          onClick={handleFollowToggle}
          size="small"
          sx={{ mt: 2, borderRadius: '16px' }}
        >
          {isFollowing ? 'Following' : 'Follow'}
        </Button>
      </Paper>
    );
  };
  const [suggestions, setSuggestions] = React.useState(suggestionsData);


  const dateVisible = (date) => {
    const newDate = new Date(date)

    const year = newDate.getFullYear();
    const month = newDate.getMonth() + 1; // Months are zero-based, so we add 1
    const day = newDate.getDate();
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;

  }

  const SkillsSection = ({ skills }) => {
    const listItemStyle = {
      backgroundColor: mode?'darkslategray':'#ffffff',
      borderRadius: '4px',
      marginBottom: '8px',
      boxShadow: mode?'0px 0px 4 white':'0px 2px 4px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '8px',color: mode&& 'white'
    };

    return (

      <Stack direction={'row'} flexWrap={'wrap'}>
        {skills.map((skill, index) => (
          <Box sx={mode?{ p: '10px', bgcolor: 'lightpink', color: 'grey', margin: '8px',boxShadow:"0px 0px 4px white" }
          :{ p: '10px', bgcolor: 'lightpink', color: 'grey', margin: '8px' }} key={index} style={listItemStyle}>
            <Box sx={{ padding: '3px', fontWeight: 700 }} >{skill}</Box>
          </Box>
        ))}
      </Stack>
    );
  };

  const AddressSection = ({ address }) => {

    return (
      <>
        {address && address.map((address, index) => (
          <Paper key={index} sx={mode?{ mb: 2, p: 2, boxShadow: '0px 0px 5px white',color:'white',background:'darkslategray' }:
          { mb: 2, p: 2, boxShadow: '0px 0px 5px grey' }}>
            <Typography variant="h6">Address-</Typography>
            <Typography variant="body1"><strong>Street:</strong> {address.street}</Typography>
            <Typography variant="body1"><strong>City:</strong> {address.city}</Typography>
            <Typography variant="body1"><strong>State:</strong> {address.state}</Typography>
            <Typography variant="body1"><strong>Country:</strong> {address.country}</Typography>
            <Typography variant="body1"><strong>Zip Code:</strong> {address.zipCode}</Typography>
          </Paper>))}
      </>
    );
  };





  return (
    <>
      <Nav />
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />

        {/* Hero unit */}
        {/* End hero unit */}
        <Container component="main" sx={{ mt: '65px' }}>
        <Grid container spacing={4}>
            <Grid item xs={12} md={8}>

              <Stack spacing={3}>
            <Box >
              <Box sx={mode?{ bgcolor: 'darkslategray',color:'white', borderRadius: '8px', mb: '15px',boxShadow:'0px 0px 3px lightgrey' }
              :{ bgcolor: 'white', borderRadius: '8px', mb: '15px' }}>
                <div >
                  <img src='https://static.licdn.com/aero-v1/sc/h/55k1z8997gh8dwtihm11aajyq' alt='banner' />
                </div>
                <Box p={'19px'} sx={{ display: 'grid', placeItems: 'left' }} >
                  <Box sx={{ ml: '15px' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar alt="Remy Sharp"
                        src={userData.profileImage}
                        sx={{
                          width: { xs: 80, sm: 110, md: 156 }, height: { xs: 80, sm: 110, md: 156 },
                          border: '2px solid white', fontSize: '80px',
                          mt: { xs: '-50px', sm: '-75px', md: '-100px' }, bgcolor: '#f3f6f9'
                           }}>
                        A</Avatar>

                    </Box>

                    <Typography my={1} sx={{ ml: '8px' }} variant={'h5'}>
                      {userData.name}
                    </Typography>

                    <Typography sx={mode?{ fontWeight: 700, color: "white" }:{ fontWeight: 700, color: "grey" }} variant={'p'}>{userData.email}</Typography>
                  </Box>
                  <Stack alignItems={{ xs: 'flex-start', md: 'center' }}
                       justifyContent={{ xs: 'flex-start', sm: 'space-between' }}
                       spacing={2}
                       direction={{ xs: 'column', sm: 'row' }}>
                    <Stack direction="row" alignItems="center"  style={{marginBlock:'16px'}}>
                      <div>
                        {userData.isFollowed? <Button
                          onClick={handleClickFollow}
                          variant='outlined'
                          sx={mode?{ borderRadius: '22px',color:'white',textTransform:'none' }
                          :{ borderRadius: '22px',textTransform:'none' }}>
                          Following
                        </Button> :<Button
                          onClick={handleClickFollow}
                          variant='contained'
                          sx={mode?{ borderRadius: '22px',color:'white',textTransform:'none' }
                          :{ borderRadius: '22px',textTransform:'none' }}>
                          Follow
                        </Button>}
                        
                      </div>

                      <div style={{ marginLeft: '8px',marginTop:{xs:'8px',md:0} }}>
                      <TriggerButton type="button" 
                            sx={mode?{ borderRadius: '30px', p: 1, border: '1px solid white',paddingInline:'15px'
                            ,background:'black',color:'white', flex: 'start', width: '100%','&:hover':{background:'#221e1e'} }:
                            { borderRadius: '30px', p: 1, border: '1px solid #36c',paddingInline:'15px',
                            background:'white',color:'#36c', flex: 'start', width: '100%','&:hover':{background:'#f9f2f2'} }}
                              onClick={handleMore}>More
                            </TriggerButton>
                            <Modal
                            open={openMore}
                            onClose={handleCloseMore}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                          >
                            <Box sx={mode ? darkStyle : style} >
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                                <h2 id="unstyled-modal-title" className="modal-title">
                                  Can't find the content you are looking for?
                                </h2>
                                <CloseIcon sx={mode && { color: 'white' }} onClick={handleCloseMore} />
                              </Box>
                              <Typography id="modal-modal-title" variant="body2" component="h2">
                                No Options to display
                              </Typography>
                              <Typography id="modal-modal-description" variant="body1" sx={{ mt: 2 }}>
                                Sorry for the issue
                              </Typography>
                            </Box>
                          </Modal>
                        
                      </div>
                    </Stack>
                    <Box mx={3} mt={{xs:'12px',md:0}} style={{marginBlock:'14px'}}>
                      {userData.phone ? <Box
                        sx={mode?{ display: 'flex', alignItems: 'center', bgcolor: 'black', px: '8px', borderRadius: '6px' }:{ display: 'flex', alignItems: 'center', bgcolor: '#f3f6f9', px: '8px', borderRadius: '6px' }}>
                        <Typography sx={{ fontWeight: 700 }}
                          variant="h6">
                          Contact-
                          <Typography sx={{ fontWeight: 600, display: 'inline-block' }}
                            variant="body2" >{userData.phone}
                          </Typography>

                        </Typography>
                      </Box> : null
                      }
                    </Box>

                  </Stack>
                  <Typography sx={{ marginLeft: '9px', color: 'gray', fontWeight: 700, fontSize:'16px' }}
                    variant="p" gutterBottom>
                     {userData.isFollowed?'Followers 1':'No followers'}
                  </Typography>
                  <Box>
                    <div></div>
                    <div></div>
                  </Box>
                </Box>
              </Box>

              {/* <================suggestion===================> */}

              <Box className='suggestion' style={mode?{ marginBottom: '20px',boxShadow:'0px 0px 4px white',background:'black' }:{ marginBottom: '20px' }}>
                <Paper style={mode?{ padding: 20 ,background:'black',color:'white'}:{ padding: 20 }}>
                  <Typography variant="h5" component={'h4'} gutterBottom>
                    Suggestions for you
                  </Typography>
                  <Grid container spacing={2}>
                    {suggestions.map(suggestion => (
                      <Grid item key={suggestion.id} xs={12} sm={6} md={4} lg={3}>
                        <Suggestion suggestion={suggestion} />
                      </Grid>
                    ))}
                  </Grid>
                </Paper>

              </Box>

              {/* <================Experience===================> */}

              <Box className='experience' style={mode?{marginBottom:'20px',boxShadow:'0px 0px 4px white', borderRadius: '8px' }:{ marginBottom: '20px' }}>
                <Paper elevation={3} className="experience-section" style={mode?{ padding: '20px', borderRadius: '8px',background:'black',color:'white',boxShadow:'0px 0px 4px white' }:
                { padding: '20px', borderRadius: '8px' }}>
                  <Stack direction="row" alignItems="center" justifyContent={'space-between'} >
                    <Typography  variant="h5" gutterBottom>
                      Experience</Typography>
                  </Stack>
                  <Grid container spacing={2}>
                    {userData.workExperience ? userData.workExperience.map((experience, index) => (
                      <Grid item xs={12} key={index}>
                        <Paper elevation={1} style={mode?{ padding: '15px', marginBottom: '15px',background:'darkslategray',color:'white',boxShadow:'0px 0px 4px white' }:{ padding: '15px', marginBottom: '15px' }}>
                          <Paper style={mode?{background:'#0e3737',color:'white',padding: '9px', borderRadius: '5px' }:{ background: '#f9f9f9', padding: '9px', borderRadius: '5px' }}>
                            <Typography variant="h5">{experience.designation}</Typography>
                            <Typography variant="body1">{experience.companyName}</Typography>
                            <Typography variant="body1">{experience.location}</Typography>

                            <Typography variant="body1">
                              {dateVisible(experience.startDate)} - {dateVisible(experience.endDate)}</Typography>
                          </Paper>
                          <List>
                            <ListItem>
                              <ListItemText primary={experience.description} />
                            </ListItem>
                          </List>
                        </Paper>
                      </Grid>
                    )) : <Typography sx={{ margin: 'auto', my: 2, color: 'grey' }} variant="h5">
                      <i>No Experience</i></Typography>
                    }
                  </Grid>
                </Paper>
                <Typography></Typography>
              </Box>

              {/* <================Education===================> */}

              <Box className='eduction' style={mode?{marginBottom:'20px',boxShadow:'0px 0px 4px white', borderRadius: '8px'}:{ marginBottom: '20px' }}>
                <Paper style={mode?{padding: '20px', marginBottom: '20px', borderRadius: '8px' ,background:'black',color:'white',boxShadow:'0px 0px 4px white'}:{ padding: '20px', marginBottom: '20px', borderRadius: '8px' }}>
                  <Stack direction="row" alignItems={'center'} justifyContent={'space-between'}>
                    <Typography variant="h5" gutterBottom>Education</Typography>
                  </Stack>
                  <Grid container spacing={2}>
                    {userData.education ? userData.education.map((education, index) => (
                      <Grid item xs={12} key={index}>
                        <Paper style={mode?{ padding: '15px', backgroundColor: 'darkslategray',color:'white', borderRadius: '8px', boxShadow: '0px 0px 4px white'}:
                        { padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.05)' }}>
                          <Typography variant="h5" gutterBottom>Degree- {education.degree}</Typography>
                          <Typography variant="subtitle1" gutterBottom>
                            College- {education.schoolName}</Typography>
                          <Typography variant="body1" gutterBottom>
                            StartDate- {dateVisible(education.startDate)}
                          </Typography>
                          <Typography variant="body1" gutterBottom>EndDate- {dateVisible(education.endDate)}</Typography>
                          <Typography variant="body1">About- {education.description}</Typography>
                        </Paper>
                      </Grid>
                    )) : <Typography sx={{ margin: 'auto', my: 2, color: 'grey' }} variant="h5">
                      <i>No Education</i></Typography>
                    }
                  </Grid>
                </Paper>
              </Box>

              {/* <================SkillsSkills===================> */}

              <Box className='skills' sx={mode&&{background:'black',color:'white',boxShadow:'0px 0px 4px white', borderRadius: '8px'}}>
                <Paper style={mode?{ padding: '20px', marginBottom: '20px', borderRadius: '8px',background:'black',color:'white', }:
                { padding: '20px', marginBottom: '20px', borderRadius: '8px' }}>
                  <Stack direction="row" alignItems={'center'} justifyContent={'space-between'}>
                    <Typography  variant="h5" gutterBottom>Skills</Typography>
                  </Stack>

                  {userData.skills ? <SkillsSection skills={userData.skills} /> :
                    <Typography sx={{ margin: 'auto', my: 2, color: 'grey' }} variant="h5">
                      <i>No Skills</i></Typography>}

                </Paper>
              </Box>

              {/* <================Address===================> */}
              <Box className='address' sx={mode&&{background:'black',color:'white',boxShadow:'0px 0px 4px white', borderRadius: '8px'}}>
                <Paper elevation={3} className="experience-section"
                 style={mode?{ background:'black',color:'white',padding: '20px', borderRadius: '8px',marginBottom:'20px' }:{ padding: '20px', borderRadius: '8px',marginBottom:'20px' }}>
                  <Stack direction="row" mb={2} alignItems={'center'} justifyContent={'space-between'}>
                    <Typography variant="h5" gutterBottom>
                      Address Section
                    </Typography>

                  </Stack>
                  {userData.address ? <AddressSection address={userData.address} />
                    : <Typography sx={{ margin: 'auto', my: 2, color: 'grey' }} variant="h5">
                      <i>No Address</i></Typography>}
                </Paper>
              </Box>

              {/* <================Payment===================> */}
              <Box className='address' sx={mode&&{background:'black',color:'white',boxShadow:'0px 0px 4px white', borderRadius: '8px'}}>
              <Paper elevation={3} className="experience-section" 
              style={mode?{background:'black',color:'white', padding: '20px', borderRadius: '8px',marginBottom:'20px' }:{ padding: '20px', borderRadius: '8px',marginBottom:'20px' }}>
                      {userData.paymentDetails &&
                        userData.paymentDetails.map((payment) =>
                        (<Paper sx={mode?{ mb: 2, p: 2, boxShadow: '0px 0px 5px white',background:'darkslategray',color:'white' }:{ mb: 2, p: 2, boxShadow: '0px 0px 5px grey' }} key={payment._id}>
                            <Typography variant="h5" component="h2">
                              Payment Information
                            </Typography>
                            <Typography variant="body2" sx={mode&&{color:'white'}} color="textSecondary" gutterBottom>
                              Card Number: {payment.cardNumber}
                            </Typography>
                            <Typography variant="body2" sx={mode&&{color:'white'}} color="textSecondary" gutterBottom>
                              CVV: *{payment.cvv}
                            </Typography>
                            <Typography variant="body2" sx={mode&&{color:'white'}} color="textSecondary" gutterBottom>
                              Expiration Date: {payment.expirationDate}
                            </Typography>
                        </Paper>)
                        )}
              </Paper>
              </Box>
            </Box>

          </Stack>
          </Grid>
          {isMdScreen && (
              <Grid item md={4}>
                <LeftSearchCard sx={{ top: 0, margin: 0 }} />
              </Grid>
            )}
          </Grid>
        </Container>
        {/* Footer */}
        <Container
          maxWidth="md"
          component="footer"
          sx={mode?
            {
              borderTop: (theme) => `1px solid ${theme.palette.divider}`,
              mt: 8,
              py: [3, 6], bgcolor: 'black', borderRadius: '0px 28px'
            }:{
            borderTop: (theme) => `1px solid ${theme.palette.divider}`,
            mt: 8,
            py: [3, 6], bgcolor: 'white', borderRadius: '0px 28px'
          }}
        >
          <Grid container spacing={4} justifyContent="space-evenly">
            {footers.map((footer) => (
              <Grid item xs={6} sm={3} key={footer.title}>
                <Typography variant="h6" sx={mode&&{color:'white'}} color="text.primary" gutterBottom>
                  {footer.title}
                </Typography>
                <ul>
                  {footer.description.map((item) => (
                    <li key={item}>
                      <Link href="#" sx={mode&&{color:'white'}} variant="subtitle1" color="text.secondary">
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Grid>
            ))}
          </Grid>
          <Copyright sx={mode?{mt:5,color:'white'}:{ mt: 5 }} />
        </Container>
        {/* End footer */}
      </ThemeProvider >
    </>
  );
}


const blue = {
  200: '#99CCFF',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0066CC',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const Modal = styled(BaseModal)(`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  &.base-Modal-hidden {
    visibility: hidden;
  }
`);

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 400,
  minWidth: 290,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: '8px'
};
const darkStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 400,
  minWidth: 290,
  bgcolor: 'black',
  color: 'white',
  border: '2px solid #000',
  boxShadow: '0px 0px 14px white',
  p: 4,
  borderRadius: '8px'
}
const TriggerButton = styled('button')(
  ({ theme }) => css`
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    border-radius: 8px;
    transition: all 150ms ease;
    cursor: pointer;
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

    &:hover {
      background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
      border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
    }

    &:active {
      background: ${theme.palette.mode === 'dark' ? grey[700] : grey[100]};
    }

    &:focus-visible {
      box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? blue[300] : blue[200]};
      outline: none;
    }
  `,
);