import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import { Avatar, Box, List, ListItem, ListItemText, Paper, Stack, useMediaQuery } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import LeftSearchCard from './LeftSearchCard';
import Nav from '../Header/Navigation';
import Context from '../ContextApi/MainContext';
import { footers } from './Store';
import { useContext } from 'react';
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
  const { getId } = useContext(Context);
  const [userData, setUserData] = React.useState([])
  const theme = useTheme();
  const isMdScreen = useMediaQuery(theme.breakpoints.up('md'));


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
      <Paper elevation={3} sx={{ p: 2, borderRadius: '8px' }}>
        <Avatar></Avatar>
        <Typography variant="h6">{suggestion.name}</Typography>
        <Typography variant="body1" color="textSecondary">
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
      backgroundColor: '#ffffff',
      borderRadius: '4px',
      marginBottom: '8px',
      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '8px',
    };

    return (

      <Stack direction={'row'} flexWrap={'wrap'}>
        {skills.map((skill, index) => (
          <Box sx={{ p: '10px', bgcolor: 'lightpink', color: 'grey', margin: '8px' }} key={index} style={listItemStyle}>
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
          <Paper key={index} sx={{ mb: 2, p: 2, boxShadow: '0px 0px 5px grey' }}>
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
              <Box sx={{ bgcolor: 'white', borderRadius: '8px', mb: '15px' }}>
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

                    <Typography sx={{ fontWeight: 700, color: "grey" }} variant={'p'}>{userData.email}</Typography>
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
                          sx={{ borderRadius: '22px' }}>
                          Following
                        </Button> :<Button
                          onClick={handleClickFollow}
                          variant='contained'
                          sx={{ borderRadius: '22px' }}>
                          Follow
                        </Button>}
                        
                        
                      </div>

                      <div style={{ marginLeft: '8px',marginTop:{xs:'8px',md:0} }}>
                        <Button
                          id="demo-customized-button"
                          variant="outlined"
                          disableElevation
                          sx={{ borderRadius: '20px' }}
                        >
                          more
                        </Button>
                      </div>
                    </Stack>
                    <Box mx={3} mt={{xs:'12px',md:0}} style={{marginBlock:'14px'}}>
                      {userData.phone ? <Box
                        sx={{ display: 'flex', alignItems: 'center', bgcolor: '#f3f6f9', px: '8px', borderRadius: '6px' }}>
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
                  <Typography sx={{ marginLeft: '9px', color: 'gray', fontWeight: 700, textDecoration: 'underline' }}
                    variant="p" gutterBottom>
                    Following 0
                  </Typography>
                  <Box>
                    <div></div>
                    <div></div>
                  </Box>
                </Box>
              </Box>

              {/* <================suggestion===================> */}

              <Box className='suggestion' style={{ marginBottom: '20px' }}>
                <Paper style={{ padding: 20 }}>
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

              <Box className='experience' style={{ marginBottom: '20px' }}>
                <Paper elevation={3} className="experience-section" style={{ padding: '20px', borderRadius: '8px' }}>
                  <Stack direction="row" alignItems="center" justifyContent={'space-between'} >
                    <Typography sx={{ textDecoration: 'underline' }} variant="h5" gutterBottom>
                      Experience</Typography>
                  </Stack>
                  <Grid container spacing={2}>
                    {userData.workExperience ? userData.workExperience.map((experience, index) => (
                      <Grid item xs={12} key={index}>
                        <Paper elevation={1} style={{ padding: '15px', marginBottom: '15px' }}>
                          <Paper style={{ background: '#f9f9f9', padding: '9px', borderRadius: '5px' }}>
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

              <Box className='eduction' style={{ marginBottom: '20px' }}>
                <Paper style={{ padding: '20px', marginBottom: '20px', borderRadius: '8px' }}>
                  <Stack direction="row" alignItems={'center'} justifyContent={'space-between'}>
                    <Typography sx={{ textDecoration: 'underline' }} variant="h5" gutterBottom>Education</Typography>
                  </Stack>
                  <Grid container spacing={2}>
                    {userData.education ? userData.education.map((education, index) => (
                      <Grid item xs={12} key={index}>
                        <Paper style={{ padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.05)' }}>
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

              <Box className='skills'>
                <Paper style={{ padding: '20px', marginBottom: '20px', borderRadius: '8px' }}>
                  <Stack direction="row" alignItems={'center'} justifyContent={'space-between'}>
                    <Typography sx={{ textDecoration: 'underline' }} variant="h5" gutterBottom>Skills</Typography>
                  </Stack>

                  {userData.skills ? <SkillsSection skills={userData.skills} /> :
                    <Typography sx={{ margin: 'auto', my: 2, color: 'grey' }} variant="h5">
                      <i>No Skills</i></Typography>}

                </Paper>
              </Box>

              {/* <================Address===================> */}
              <Box className='address'>
                <Paper elevation={3} className="experience-section" style={{ padding: '20px', borderRadius: '8px',marginBottom:'20px' }}>
                  <Stack direction="row" mb={2} alignItems={'center'} justifyContent={'space-between'}>
                    <Typography sx={{ textDecoration: 'underline' }} variant="h5" gutterBottom>
                      Address Section
                    </Typography>

                  </Stack>
                  {userData.address ? <AddressSection address={userData.address} />
                    : <Typography sx={{ margin: 'auto', my: 2, color: 'grey' }} variant="h5">
                      <i>No Address</i></Typography>}
                </Paper>
              </Box>

              {/* <================Payment===================> */}
              <Box className='address'>
              <Paper elevation={3} className="experience-section" style={{ padding: '20px', borderRadius: '8px',marginBottom:'20px' }}>
                      {userData.paymentDetails &&
                        userData.paymentDetails.map((payment) =>
                        (<Paper sx={{ mb: 2, p: 2, boxShadow: '0px 0px 5px grey' }} key={payment._id}>
                            <Typography variant="h5" component="h2">
                              Payment Information
                            </Typography>
                            <Typography variant="body2" color="textSecondary" gutterBottom>
                              Card Number: {payment.cardNumber}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" gutterBottom>
                              CVV: *{payment.cvv}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" gutterBottom>
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
          sx={{
            borderTop: (theme) => `1px solid ${theme.palette.divider}`,
            mt: 8,
            py: [3, 6], bgcolor: 'white', borderRadius: '0px 28px'
          }}
        >
          <Grid container spacing={4} justifyContent="space-evenly">
            {footers.map((footer) => (
              <Grid item xs={6} sm={3} key={footer.title}>
                <Typography variant="h6" color="text.primary" gutterBottom>
                  {footer.title}
                </Typography>
                <ul>
                  {footer.description.map((item) => (
                    <li key={item}>
                      <Link href="#" variant="subtitle1" color="text.secondary">
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Grid>
            ))}
          </Grid>
          <Copyright sx={{ mt: 5 }} />
        </Container>
        {/* End footer */}
      </ThemeProvider >
    </>
  );
}






const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));