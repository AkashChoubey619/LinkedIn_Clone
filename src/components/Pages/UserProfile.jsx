import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import { Avatar, Box, List, ListItem, ListItemText, Paper, Stack, TextField, useMediaQuery } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import AddImage from '@mui/icons-material/AddPhotoAlternateOutlined';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LeftSearchCard from './LeftSearchCard';
import PropTypes from 'prop-types';
import Context from '../ContextApi/MainContext';
import { css } from '@mui/system';
import { Modal as BaseModal } from '@mui/base/Modal';
import Nav from '../Header/Navigation';
import clsx from 'clsx';
import { footers } from './Store';
import AddIcon from '@mui/icons-material/Add';
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
  const myData = localStorage.getItem('userData');
  const id = JSON.parse(myData)._id
  const [previewUrl, setPreviewUrl] = React.useState('');
  const {mode}=React.useContext(Context);
  const theme = useTheme();
  const isMdScreen = useMediaQuery(theme.breakpoints.up('md'));
  const [userData, setUserData] = React.useState([])
  const [education, setEducation] = React.useState({
    schoolName: '',
    degree: '',
    startDate: '',
    endDate: '',
    description: ''
  });
  const [address, setAddress] = React.useState({
    street: '',
    city: '',
    state: '',
    country: '',
    zipCode: ''
  });
  const [experience, setExperience] = React.useState({
    companyName: '',
    designation: '',
    startDate: '',
    endDate: '',
    description: '',
    location: ''
  });
  const [myName, setMyName] = React.useState("")
  const [nameId, setNameId] = React.useState("")
  const isName = nameId === userData._id;
  

  const [myPhone, setMyPhone] = React.useState("")
  const [phoneId, setPhoneId] = React.useState("")
  const isPhone = phoneId === userData._id;

  const [mySkills, setMySkills] = React.useState("")
  const [skillsId, setSkillsId] = React.useState("")
  const isSkills = skillsId === userData._id;

  const editPhoneId = () => {
    setPhoneId(userData._id);
  }

  const editSkillId = () => {
    setSkillsId(userData._id);
    setMySkills(userData.skills)
  }

  const editNameId = () => {
    setNameId(userData._id);
    setMyName(userData.name)
  }

  const [openExp, setOpenExp] = React.useState(false);
  const handleOpenExp = () => setOpenExp(true);
  const handleCloseExp = () => setOpenExp(false);

  const [openEdu, setOpenEdu] = React.useState(false);
  const handleOpenEdu = () => setOpenEdu(true);
  const handleCloseEdu = () => setOpenEdu(false);

  const [openAddImg, setOpenAddImg] = React.useState(false);
  const handleOpenAddImg = () => setOpenAddImg(true);
  const handleCloseAddImg = () => setOpenAddImg(false);

  const [openAdd, setOpenAdd] = React.useState(false);
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

  const myInfo = async function () {
    try {
      const res = await fetch(`https://academics.newtonschool.co/api/v1/linkedin/user/${id}`, {
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
  }, [])
console.log(userData);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const suggestionsData = [
    { id: 1, name: 'John Doe', occupation: 'Software Engineer' },
    { id: 2, name: 'Jane Smith', occupation: 'Data Scientist' },
    { id: 3, name: 'Alice Johnson', occupation: 'Product Manager' },
    // Add more suggestions as needed
  ];

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);

    // setSelectedFile(URL.createObjectURL(previewUrl));
    setPreviewUrl('')
  };

  const handleSubmitAddImg = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("profileImage", previewUrl)
    try {
      const res = await fetch(`https://academics.newtonschool.co/api/v1/linkedin/user/${id}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          projectID: 'ut1dy4576cd1'

        },
        body: formData,
      })

      if (res.ok) {
        const profileImagData = await res.json()
        // setUserData(addData)
        console.log('Address:', profileImagData);
        window.location.reload();
      }

    } catch (error) {
      console.error('profileImagError:', error);
    }

  };

  const handleEditPhone = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch(`https://academics.newtonschool.co/api/v1/linkedin/user/${id}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          projectID: 'ut1dy4576cd1'

        },
        body: JSON.stringify({
          "phone": myPhone,
        })
      })

      if (res.ok) {
        const myData = await res.json()
        console.log('educationData:', myData);
        setMyPhone('')
        setPhoneId("")
        window.location.reload();
      }

    } catch (error) {
      console.error('MyDataError:', error);
    }
  }


  const handleEditName = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch(`https://academics.newtonschool.co/api/v1/linkedin/user/${id}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          projectID: 'ut1dy4576cd1'

        },
        body: JSON.stringify({
          "name": myName,
        })
      })

      if (res.ok) {
        const myData = await res.json()
        console.log('educationData:', myData);
        setMyName('')
        setNameId("")
        window.location.reload();
      }

    } catch (error) {
      console.error('MyDataError:', error);
    }
  }

  const handleChangeAddress = (event) => {
    const { name, value } = event.target;
    setAddress(prevAddress => ({
      ...prevAddress,
      [name]: value
    }));
  };

  const handleSubmitAddress = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch(`https://academics.newtonschool.co/api/v1/linkedin/user/${id}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          projectID: 'ut1dy4576cd1'

        },
        body: JSON.stringify({
          address: {
            street: address.street,
            city: address.city,
            state: address.state,
            country: address.country,
            zipCode: address.zipCode
          }
        })
      })

      if (res.ok) {
        const addressData = await res.json()
        // setUserData(addData)
        console.log('Address:', addressData);
        window.location.reload();
      }

    } catch (error) {
      console.error('AddressError:', error);
    }

  };

  const handleChangeEducation = (event) => {
    const { name, value } = event.target;
    setEducation(prevAddress => ({
      ...prevAddress,
      [name]: value
    }));
  };

  const handleSubmitEducation = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch(`https://academics.newtonschool.co/api/v1/linkedin/user/${id}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          projectID: 'ut1dy4576cd1'

        },
        body: JSON.stringify({
          education: {
            schoolName: education.schoolName,
            degree: education.degree,
            startDate: education.startDate,
            endDate: education.endDate,
            description: education.description
          }
        })
      })

      if (res.ok) {
        const educationData = await res.json()
        // setUserData(addData)
        console.log('educationData:', educationData);
        setOpenEdu(false)

        window.location.reload();
      }

    } catch (error) {
      console.error('EducationError:', error);
    }

  };

  const handleChangeExperience = (event) => {
    const { name, value } = event.target;
    setExperience(prevAddress => ({
      ...prevAddress,
      [name]: value
    }));
  };

  const handleSubmitExperience = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    Object.entries(experience).forEach(([key, value]) => {
      formData.append(key, value)
    })
    try {
      const res = await fetch(`https://academics.newtonschool.co/api/v1/linkedin/user/${id}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          projectID: 'ut1dy4576cd1'
        },
        body: formData,
      })

      if (res.ok) {
        const experienceData = await res.json()
        // setUserData(addData)
        console.log('ExperienceData:', experienceData);
        setOpenExp(false)

        window.location.reload();
      }

    } catch (error) {
      console.error('ExperienceError:', error);
    }

  };

  const handleEditSkills = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("skills", mySkills)
    try {
      const res = await fetch(`https://academics.newtonschool.co/api/v1/linkedin/user/${id}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          projectID: 'ut1dy4576cd1'

        },
        body: formData,
      })

      if (res.ok) {
        const editSkills = await res.json()
        // setUserData(addData)
        console.log('mySkill:', editSkills);
        window.location.reload();
      }

    } catch (error) {
      console.error('editSkillsError:', error);
    }
  }

  const Suggestion = ({ suggestion }) => {
    const [isFollowing, setIsFollowing] = React.useState(false);

    const handleFollowToggle = () => {
      setIsFollowing(prevState => !prevState);
    };

    return (
      <Paper elevation={3} sx={mode?{background:'darkslategray',color:'white',p: 2, borderRadius: '8px' }:{ p: 2, borderRadius: '8px' }}>
        <Avatar></Avatar>
        <Typography variant="h6">{suggestion.name}</Typography>
        <Typography sx={mode&&{color:'whiite'}} variant="body1" color="textSecondary">
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
    console.log(skills,'skills')
    const Skills =  skills && skills.length >= 0 ? skills[0].split(',') : [];
    const listItemStyle = {
      backgroundColor: mode?'darkslategray':'#ffffff',
      borderRadius: '4px',
      marginBottom: '8px',
      boxShadow: mode?'0px 0px 4px lightgrey': '0px 2px 4px rgba(0, 0, 0, 0.3)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '8px',
    };

    return (

      <Stack direction={'row'} flexWrap={'wrap'}>
        {Skills.map((skill, index) => (
          <Box sx={mode?{ p: '10px', bgcolor: 'darkslategray', color: 'white', margin: '8px' }:{ p: '10px', bgcolor: 'lightpink', color: 'grey', margin: '8px' }}
           key={index} style={listItemStyle}>
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
          <Paper key={index} sx={mode?{ mb: 2, p: 2, boxShadow: '0px 0px 5px lightgrey',color:'white',background:'darkslategray' }
          :{ mb: 2, p: 2, boxShadow: '0px 0px 5px grey' }}>
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
        <Container component="main" sx={{ mt: '65px' }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Stack spacing={3}>
                <Box >
                  <Box sx={mode?{ bgcolor: 'black', borderRadius: '8px', mb: '15px',color:'white' }:{ bgcolor: 'white', borderRadius: '8px', mb: '15px' }}>
                    <div >
                      <img src='https://static.licdn.com/aero-v1/sc/h/55k1z8997gh8dwtihm11aajyq' alt='banner' />
                    </div>
                    <Box p={'19px'} sx={{ display: 'grid', placeItems: 'left' }} >
                      <Box sx={{ ml: '15px' }}>
                        <Box sx={mode?{ display: 'flex', alignItems: 'center',bgcolor:'black',color:'white' }:{ display: 'flex', alignItems: 'center' }}>
                          <Avatar alt="Remy Sharp"
                            src={userData.profileImage}
                            sx={{
                              width: { xs: 80, sm: 125, md: 156 }, height: { xs: 80, sm: 110, md: 156 },
                              border: '2px solid white', fontSize: '80px',
                              mt: { xs: '-50px', sm: '-75px', md: '-100px' }, bgcolor: '#f3f6f9'
                            }}>
                            A</Avatar>
                          <TriggerButton sx={mode?{ ml: '-28px', zIndex: '20', borderRadius: '50%',background:'darkslategray',color:'white' }:
                          { ml: '-28px', zIndex: '20', borderRadius: '50%' }} 
                          type="button" onClick={handleOpenAddImg}>
                            <AddImage />
                          </TriggerButton>

                          <Modal
                            aria-labelledby="unstyled-modal-title"
                            aria-describedby="unstyled-modal-description"
                            open={openAddImg}
                            onClose={handleCloseAddImg}
                            slots={{ backdrop: StyledBackdrop }}
                          >
                            <ModalContent sx={mode?{ width: 400,background:'black',color:'white' }:{ width: 400 }}>
                              <Paper style={mode?{ padding: '16px', marginBottom: '16px',background:'black',color:'white',boxShadow:'0px 0px 4px grey' }
                              :{ padding: '16px', marginBottom: '16px' }}>
                                <Typography variant="h6">Add Profile Image</Typography>
                                <form onSubmit={handleSubmitAddImg}>
                                  <input
                                    type="file"
                                    accept=".jpg,.jpeg,.png"
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                    id="file-input"
                                  />
                                  <label htmlFor="file-input">
                                    <Button component="span" color="primary">
                                      Upload File
                                    </Button>
                                  </label>
                                  <Box sx={{ boxShadow: '0px 0px 5px grey', my: '5px', minWidth: '250px' }} >
                                    {previewUrl && (
                                      <div>
                                        <img src={previewUrl} alt="Preview" style={{ maxWidth: '100%', marginTop: '10px' }} />
                                      </div>
                                    )}
                                  </Box>

                                  <Button onClose={handleCloseAddImg} type="submit" variant="contained"
                                    sx={{ m: 1, p: 1, height: '30px' }}
                                    color="primary" >
                                    Save
                                  </Button>
                                  <Button sx={mode?{ m: 1, height: '30px',color:'white' }:{ m: 1, height: '30px' }}
                                    onClick={() => {
                                      setOpenAddImg(false)
                                      setPreviewUrl('')
                                    }} variant="outlined" color="primary">
                                    Cancel
                                  </Button>

                                </form>
                              </Paper>
                            </ModalContent>
                          </Modal>
                        </Box>
                        {isName ?
                          <form onSubmit={handleEditName}>
                            <input type='text' name='name' style={mode?{ padding: '5px', borderRadius: '12px',background:'darkslategray',color:'white', border: '1px solid grey' }
                            :{ padding: '5px', borderRadius: '12px', border: '1px solid grey' }}
                              id='myName' value={myName} placeholder='Enter name'
                              onChange={(e) => setMyName(e.target.value)} required
                            />
                            <Button sx={{ marginInline: 2, borderRadius: '14px' }} variant='contained' type='submit'>Save</Button>
                            <Button sx={mode?{ borderRadius: '14px',color:'white' }:{ borderRadius: '14px' }} 
                            variant='outlined' onClick={() => { setNameId('') }}>Cancel</Button>
                          </form> :
                          <Typography my={1} sx={{ ml: '8px' }} variant={'h5'}>
                            {userData.name}
                            <Button onClick={editNameId} sx={{ padding: 0, margin: 0, ml: '20px', mt: '-4px' }}>
                              <EditIcon sx={mode&&{color:'white'}}/></Button>
                          </Typography>
                        }

                        <Typography sx={{ fontWeight: 700, color: "grey" }} variant={'p'}>{userData.email}</Typography>
                      </Box>
                      <Stack alignItems={{ xs: 'flex-start', md: 'center' }}
                       justifyContent={{ xs: 'flex-start', md: 'space-between' }}
                       spacing={2}
                       direction={{ xs: 'column', md: 'row' }}>
                        <Stack direction="row" alignItems="center"  style={{marginBlock:'16px'}}>
                          <div>
                            <Button
                              id="demo-customized-button"
                              aria-controls={open ? 'demo-customized-menu' : undefined}
                              aria-haspopup="true"
                              aria-expanded={open ? 'true' : undefined}
                              variant="contained"
                              disableElevation
                              onClick={handleClick}
                              sx={{ borderRadius: '22px' }}
                            >
                              Open to
                            </Button>
                            <StyledMenu
                              id="demo-customized-menu"
                              MenuListProps={{
                                'aria-labelledby': 'demo-customized-button',
                              }}
                              anchorEl={anchorEl}
                              open={open}
                              onClose={handleClose}
                            >
                              <MenuItem sx={mode&&{color:'white',background:'black'}} onClick={handleClose} disableRipple>
                                {/* <Typography  variant='h6'>Hiring</Typography> */}
                                <Typography variant='p'>
                                  Share that you’re hiring and attract qualified candidates
                                </Typography>
                              </MenuItem>
                              <MenuItem sx={mode&&{color:'white',background:'black'}} onClick={handleClose} disableRipple>
                                {/* <Typography variant='h5'>Providing Services</Typography> */}
                                <Typography variant='p'>
                                  Showcase services you offer so new clients can discover you
                                </Typography>
                              </MenuItem>
                            </StyledMenu>
                          </div>

                          <div style={{ marginLeft: '8px',marginTop:{xs:'8px',md:0} }}>
                            <Button
                              id="demo-customized-button"
                              variant="outlined"
                              disableElevation
                              sx={mode?{borderRadius:'20px',color:'white'}:{ borderRadius: '20px' }}
                            >
                              more
                            </Button>
                          </div>
                        </Stack>
                        <Box mx={3} mt={{xs:'16px',md:0}} style={{marginBlock:'16px'}}>
                          {userData.phone ? <Box
                            sx={mode?{ display: 'flex', alignItems: 'center', bgcolor: 'darkslategray', px: '8px', borderRadius: '6px' }:
                            { display: 'flex', alignItems: 'center', bgcolor: '#f3f6f9', px: '8px', borderRadius: '6px' }}>
                            <Typography sx={{ fontWeight: 700,mx:'2px',display:'inline' }}
                              variant="h6">
                              Contact- &nbsp;
                              {isPhone ?
                                <form style={{display:'inline'}} onSubmit={handleEditPhone}>
                                  <input type='tel' name='name' minLength={10}
                                    style={mode?{ padding: '5px',color:'white' ,borderRadius: '12px', border: '1px solid lightgrey',background:'darkslategray' }:
                                    { padding: '5px', borderRadius: '12px', border: '1px solid lightgrey' }}
                                    id='myName' value={myPhone} placeholder='Enter number'
                                    onChange={(e) => setMyPhone(e.target.value)} required
                                  />
                                  <Box my={1}>
                                  <Button sx={{ marginInline: 1, borderRadius: '14px' }} variant='contained' type='submit'>Save</Button>
                                  <Button sx={{ borderRadius: '14px' }} variant='outlined' onClick={() => { setPhoneId('') }}>Cancel</Button>
                                  </Box>
                                </form>
                                : (<Typography sx={{ fontWeight: 600, display: 'inline-block' }}
                                  variant="body2" >{userData.phone}
                                  <Button onClick={editPhoneId} sx={{ padding: 0, margin: 0 }}>
                                    <EditIcon sx={mode&&{color:'white'}} /></Button></Typography>)}

                            </Typography>
                          </Box> : (isPhone ?
                            <form style={{display:'inline'}} onSubmit={handleEditPhone}>
                              <input type='tel' name='name' maxLength={10}
                                style={{ padding: '5px', borderRadius: '12px', border: '1px solid lightgrey' }}
                                id='myName' value={myPhone} placeholder='Enter number'
                                onChange={(e) => setMyPhone(e.target.value)} required
                              />
                              <Button sx={{ marginInline: 1, borderRadius: '14px' }} variant='contained' type='submit'>Save</Button>
                              <Button sx={{ borderRadius: '14px' }} variant='outlined' onClick={() => { setPhoneId('') }}>Cancel</Button>
                            </form> :
                            <Button onClick={editPhoneId}>
                              <AddIcon sx={mode&&{color:'white'}} />Add Contact Number
                            </Button>
                          )


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

                  <Box className='suggestion' style={mode?{ marginBottom: '20px',boxShadow:'0px 0px 4px grey' }
                  :{ marginBottom: '20px' }}>
                    <Paper style={mode?{color:'white',background:'black',padding: 20 }:{ padding: 20 }}>
                      <Typography  variant="h5" component={'h4'} gutterBottom>
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

                  <Box className='experience' style={mode?{ marginBottom: '20px',boxShadow:'0px 0px 4px grey' }:{ marginBottom: '20px' }}>
                    <Paper elevation={3} className="experience-section"
                     style={mode?{ padding: '20px', borderRadius: '8px',background:'black',color:'white' }
                     :{ padding: '20px', borderRadius: '8px' }}>
                      <Stack direction="row" alignItems="center" justifyContent={'space-between'} >
                        <Typography variant="h5" gutterBottom>
                          Experience</Typography>

                        <TriggerButton sx={mode&&{background:'darkslategray'}} type="button" onClick={handleOpenExp}>
                          {userData.experience&&userData.experience.length>0 ? <EditIcon sx={mode&&{color:'white'}} /> : <AddIcon sx={mode&&{color:'white'}}  />}
                        </TriggerButton>

                        <Modal
                          aria-labelledby="unstyled-modal-title"
                          aria-describedby="unstyled-modal-description"
                          open={openExp}
                          onClose={handleCloseExp}
                          slots={{ backdrop: StyledBackdrop }}
                        >
                          <ModalContent sx={mode?{ width: 400,background:'black',color:'white' }:{ width: 400 }}>
                            <Paper style={mode?{ padding: '16px', marginBottom: '16px',color:'white',background:'black',boxShadow:'0px 0px 4px grey' }
                            :{ padding: '16px', marginBottom: '16px' }}>
                              <Typography variant="h6">Add Experience</Typography>
                              <form onSubmit={handleSubmitExperience}>
                                <TextField
                                  required
                                  name="companyName"
                                  label="companyName"
                                  value={experience.companyName}
                                  onChange={handleChangeExperience}
                                  fullWidth
                                  margin="normal"
                                  InputProps={{sx:mode&&{color:'white',background:'darkslategray'}}}
                                  InputLabelProps={{ sx:mode&& { color: 'white',outline:'white' } }}
                                />
                                <TextField
                                  required
                                  name="designation"
                                  label="designation"
                                  value={experience.designation}
                                  onChange={handleChangeExperience}
                                  fullWidth
                                  margin="normal"
                                  InputProps={{sx:mode&&{color:'white',background:'darkslategray'}}}
                                  InputLabelProps={{ sx:mode&& { color: 'white',outline:'white' } }}
                                />
                                <TextField
                                  required
                                  type="date"
                                  name="startDate"
                                  value={experience.startDate}
                                  onChange={handleChangeExperience}
                                  fullWidth
                                  margin="normal"
                                  InputProps={{sx:mode&&{color:'white',background:'darkslategray'}}}
                                  InputLabelProps={{ sx:mode&& { color: 'white',outline:'white' } }}
                                />
                                <TextField
                                  required
                                  type="date"
                                  name="endDate"
                                  value={experience.endDate}
                                  onChange={handleChangeExperience}
                                  fullWidth
                                  margin="normal"
                                  InputProps={{sx:mode&&{color:'white',background:'darkslategray'}}}
                                  InputLabelProps={{ sx:mode&& { color: 'white',outline:'white' } }}
                                />
                                <TextField
                                  required
                                  name="description"
                                  label="description"
                                  value={experience.description}
                                  onChange={handleChangeExperience}
                                  fullWidth
                                  margin="normal"
                                  InputProps={{sx:mode&&{color:'white',background:'darkslategray'}}}
                                  InputLabelProps={{ sx:mode&& { color: 'white',outline:'white' } }}
                                />
                                <TextField
                                  required
                                  name="location"
                                  label="location"
                                  value={experience.location}
                                  onChange={handleChangeExperience}
                                  fullWidth
                                  margin="normal"
                                  InputProps={{sx:mode&&{color:'white',background:'darkslategray'}}}
                                  InputLabelProps={{ sx:mode&& { color: 'white',outline:'white' } }}
                                />
                                <Button onClose={handleCloseEdu} type="submit" variant="contained" color="primary">
                                  Submit
                                </Button>
                              </form>
                            </Paper>
                          </ModalContent>
                        </Modal>

                      </Stack>
                      <Grid container spacing={2}>
                        {userData.experiences&&userData.experiences.length > 0 ? 
                        userData.experiences.map((experience, index) => (
                          <Grid item xs={12} key={index}>
                            <Paper elevation={1} style={mode?{ background:'darkslategray',color:'white',padding: '15px', marginBottom: '15px' }:
                            { padding: '15px', marginBottom: '15px' }}>
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
                        )) : <Typography sx={{ margin: 'auto',textAlign:'center', my: 2, color: 'grey' }} variant="h5">
                          <i>Add Experience</i></Typography>
                        }
                      </Grid>
                    </Paper>
                    <Typography></Typography>
                  </Box>

                  {/* <================Education===================> */}

                  <Box className='eduction' style={mode?{ background:'black',boxShadow:'0px 0px 4px grey',borderRadius:'8px', marginBottom: '20px' }:{ marginBottom: '20px' }}>
                    <Paper style={mode?{ padding: '20px', marginBottom: '20px', borderRadius: '8px',background:'black',color:'white' }:
                    { padding: '20px', marginBottom: '20px', borderRadius: '8px' }}>
                      <Stack direction="row" alignItems={'center'} justifyContent={'space-between'}>
                        <Typography variant="h5" gutterBottom>Education</Typography>
                        <TriggerButton sx={mode&&{color:'white',background:'darkslategray'}}  type="button" onClick={handleOpenEdu}>
                          {userData.education&&userData.education.length>0 ? <EditIcon sx={mode&&{color:'white'}} /> : <AddIcon sx={mode&&{color:'white'}} />}
                        </TriggerButton>
                        <Modal
                          aria-labelledby="unstyled-modal-title"
                          aria-describedby="unstyled-modal-description"
                          open={openEdu}
                          onClose={handleCloseEdu}
                          slots={{ backdrop: StyledBackdrop }}
                        >
                          <ModalContent sx={mode?{ width: 400,background:'black',color:'white' }:{ width: 400 }}>
                            <Paper style={mode?{background:'black',color:'white',padding: '16px', marginBottom: '16px'}:{ padding: '16px', marginBottom: '16px' }}>
                              <Typography variant="h6">Add Education</Typography>
                              <form onSubmit={handleSubmitEducation}>
                                <TextField
                                  required
                                  name="schoolName"
                                  label="schoolName"
                                  value={education.schoolName}
                                  onChange={handleChangeEducation}
                                  fullWidth
                                  margin="normal"
                                  InputProps={{sx:mode&&{color:'white',background:'darkslategray'}}}
                                  InputLabelProps={{ sx:mode&& { color: 'white',outline:'white' } }}
                                />
                                <TextField
                                  required
                                  name="degree"
                                  label="degree"
                                  value={education.degree}
                                  onChange={handleChangeEducation}
                                  fullWidth
                                  margin="normal"
                                  InputProps={{sx:mode&&{color:'white',background:'darkslategray'}}}
                                  InputLabelProps={{ sx:mode&& { color: 'white',outline:'white' } }}
                                />
                                <TextField
                                  required
                                  type="date"
                                  name="startDate"
                                  value={education.startDate}
                                  onChange={handleChangeEducation}
                                  fullWidth
                                  margin="normal"
                                  InputProps={{sx:mode&&{color:'white',background:'darkslategray'}}}
                                  InputLabelProps={{ sx:mode&& { color: 'white',outline:'white' } }}
                                />
                                <TextField
                                  required
                                  type="date"
                                  name="endDate"
                                  value={education.endDate}
                                  onChange={handleChangeEducation}
                                  fullWidth
                                  margin="normal"
                                  InputProps={{sx:mode&&{color:'white',background:'darkslategray'}}}
                                  InputLabelProps={{ sx: { color: 'white',outline:'white' } }}
                                />
                                <TextField
                                  required
                                  name="description"
                                  label="description"
                                  value={education.description}
                                  onChange={handleChangeEducation}
                                  fullWidth
                                  margin="normal"
                                  InputProps={{sx:mode&&{color:'white',background:'darkslategray'}}}
                                  InputLabelProps={{ sx:mode&& { color: 'white',outline:'white' } }}
                                />
                                <Button onClose={handleCloseEdu} type="submit" variant="contained" color="primary">
                                  Submit
                                </Button>
                              </form>
                            </Paper>
                          </ModalContent>
                        </Modal>
                      </Stack>
                      <Grid container spacing={2}>
                        {userData.education&&userData.education.length >0 ? userData.education.map((education, index) => (
                          <Grid item xs={12} key={index}>
                            <Paper style={mode?{ padding: '15px',color:'white', background: 'darkslategray', borderRadius: '8px', boxShadow: '0px 0px 5px grey' }:
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
                        )) : <Typography sx={{ margin: 'auto',textAlign:'center', my: 2, color: 'grey' }} variant="h5">
                          <i>Add Education</i></Typography>
                        }
                      </Grid>
                    </Paper>
                  </Box>

                  {/* <================SkillsSkills===================> */}

                  <Box className='skills' sx={mode&&{ color:'white',background:'black',boxShadow:'0px 0px 4px grey' }}>
                    <Paper style={mode?{ padding: '20px', marginBottom: '20px', borderRadius: '8px',background:'black' }
                    :{ padding: '20px', marginBottom: '20px', borderRadius: '8px' }}>
                      <Stack direction="row" alignItems={'center'} justifyContent={'space-between'}>
                        <Typography sx={mode&&{ color:'white' }} variant="h5" gutterBottom>Skills</Typography>
                        <Button type="button" sx={mode?{ color: 'white' }:{ color: 'black' }} onClick={editSkillId}>
                          {userData.skills&&userData.skills.length>0 ? 
                          <EditIcon onClick={editSkillId} sx={mode&&{color:'white',background:'darkslategray',p:'4px',border:'1px solid white',width:'30px',borderRadius:'10px'}} /> 
                          : <AddIcon onClick={editSkillId} sx={mode&&{color:'white',background:'darkslategray',p:'4px',border:'1px solid white',width:'30px',borderRadius:'10px'}} />}
                        </Button>
                      </Stack>

                      {userData.skills&&userData.skills.length>0 ? (isSkills ? (
                        <form onSubmit={handleEditSkills}>
                          <Typography sx={mode?{color:'white', display: 'block', fontStyle: 'italic', my: 1, fontWeight: 700}:{ color: 'grey', display: 'block', fontStyle: 'italic', my: 1, fontWeight: 700 }} variant='p'>
                            Enter skills  separated by commas.
                          </Typography>
                          <input type='text' name='skills'
                            style={mode?{ padding: '8px', borderRadius: '12px', border: '1px solid grey', minWidth: '120px', width: '50%',background:'darkslategray',color:'white' }
                            :{ padding: '8px', borderRadius: '12px', border: '1px solid grey', minWidth: '120px', width: '50%' }}
                            id='skills' value={mySkills} placeholder='Add skills'
                            onChange={(e) => setMySkills(e.target.value)} required
                          />
                          <Button sx={mode?{ marginInline: 2, borderRadius: '14px',color:'white' }:{ marginInline: 2, borderRadius: '14px' }} variant='contained' type='submit'>Save</Button>
                          <Button sx={mode?{ borderRadius: '14px',color:'white' }:{ borderRadius: '14px' }} variant='outlined' onClick={() => { setSkillsId('') }}>Cancel</Button>
                        </form>
                      )
                        : <SkillsSection  skills={userData.skills} />) :
                        (isSkills?(
                          <form  onSubmit={handleEditSkills}>
                            <Typography sx={mode?{color:'white', display: 'block', fontStyle: 'italic', my: 1, fontWeight: 700}:{ color: 'grey', display: 'block', fontStyle: 'italic', my: 1, fontWeight: 700 }} variant='p'>
                              Enter skills  separated by commas.
                            </Typography>
                            <input type='text' name='skills'
                              className={mode?'skills':'darkSkills'}
                              id='skills' value={mySkills} placeholder='Add skills'
                              onChange={(e) => setMySkills(e.target.value)} required
                            />
                            <Button sx={mode?{ marginInline: 2, borderRadius: '14px',color:'white' }:{ marginInline: 2, borderRadius: '14px' }} variant='contained' type='submit'>Save</Button>
                            <Button sx={mode?{ borderRadius: '14px',color:'white' }:{ borderRadius: '14px' }} variant='outlined' onClick={() => { setSkillsId('') }}>Cancel</Button>
                          </form>
                        )
                        :(<Typography sx={{ margin: 'auto',textAlign:'center', my: 2, color: 'grey' }} variant="h5">
                          <i>Add Skills</i></Typography>))}

                    </Paper>
                  </Box>

                  {/* <================Address===================> */}
                  <Box className='address' sx={mode&&{ color:'white',background:'black',boxShadow:'0px 0px 4px grey' }}>
                    <Paper elevation={3} className="experience-section"
                     style={mode?{ padding: '20px', borderRadius: '8px' ,background:'black',color:'white'}:{ padding: '20px', borderRadius: '8px' }}>
                      <Stack direction="row" mb={2} alignItems={'center'} justifyContent={'space-between'}>
                        <Typography sx={mode&&{ color:'white' }} variant="h5" gutterBottom>
                          Address Section
                        </Typography>
                        <TriggerButton sx={mode&&{ color:'white',background:'darkslategray' }} type="button" onClick={handleOpenAdd}>
                          {userData.address&&userData.address.length>0 ? <EditIcon sx={mode&&{ color:'white' }}  /> : <AddIcon sx={mode&&{ color:'white' }} />}
                        </TriggerButton>
                        <Modal
                          aria-labelledby="unstyled-modal-title"
                          aria-describedby="unstyled-modal-description"
                          open={openAdd}
                          onClose={handleCloseAdd}
                          slots={{ backdrop: StyledBackdrop }}
                        >
                          <ModalContent sx={mode?{ width: 400,background:'black',color:'white' }:{ width: 400 }}>
                            <Paper style={mode?{ background:'black',color:'white',boxShadow:'0px 0px 4px grey', padding: '16px', marginBottom: '16px' }
                            :{ padding: '16px', marginBottom: '16px' }}>
                              <Typography variant="h6">Address Form</Typography>
                              <form onSubmit={handleSubmitAddress}>
                                <TextField
                                  required
                                  name="street"
                                  label="Street"
                                  value={address.street}
                                  onChange={handleChangeAddress}
                                  fullWidth
                                  margin="normal"
                                  InputProps={{sx:mode&&{color:'white',background:'darkslategray'}}}
                                  InputLabelProps={{ sx:mode&& { color: 'white',outline:'white' } }}
                                />
                                <TextField
                                  required
                                  name="city"
                                  label="City"
                                  value={address.city}
                                  onChange={handleChangeAddress}
                                  fullWidth
                                  margin="normal"
                                  InputProps={{sx:mode&&{color:'white',background:'darkslategray'}}}
                                  InputLabelProps={{ sx:mode&& { color: 'white',outline:'white' } }}
                                />
                                <TextField
                                  required
                                  name="state"
                                  label="State"
                                  value={address.state}
                                  onChange={handleChangeAddress}
                                  fullWidth
                                  margin="normal"
                                  InputProps={{sx:mode&&{color:'white',background:'darkslategray'}}}
                                  InputLabelProps={{ sx:mode&& { color: 'white',outline:'white' } }}
                                />
                                <TextField
                                  required
                                  name="country"
                                  label="Country"
                                  value={address.country}
                                  onChange={handleChangeAddress}
                                  fullWidth
                                  margin="normal"
                                  InputProps={{sx:mode&&{color:'white',background:'darkslategray'}}}
                                  InputLabelProps={{ sx:mode&& { color: 'white',outline:'white' } }}
                                />
                                <TextField
                                  required
                                  name="zipCode"
                                  label="Zip Code"
                                  value={address.zipCode}
                                  onChange={handleChangeAddress}
                                  fullWidth
                                  margin="normal"
                                  InputProps={{sx:mode&&{color:'white',background:'darkslategray'}}}
                                  InputLabelProps={{ sx:mode&& { color: 'white',outline:'white' } }}
                                />
                                <Button onClose={handleCloseAdd} type="submit" variant="contained" color="primary">
                                  Submit
                                </Button>
                              </form>
                            </Paper>
                          </ModalContent>
                        </Modal>
                      </Stack>
                      {userData.address&&userData.address.length>0 ? <AddressSection address={userData.address} />
                        : <Typography sx={{ margin: 'auto',textAlign:'center', my: 2, color: 'grey' }} variant="h5">
                          <i>Add Address</i></Typography>}
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
              py: [3, 6],borderRadius: '0px 28px',background:'black'
            }:{
            borderTop: (theme) => `1px solid ${theme.palette.divider}`,
            mt: 8,
            py: [3, 6], bgcolor: 'white', borderRadius: '0px 28px'
          }}
        >
          <Grid container spacing={4} justifyContent="space-evenly">
            {footers.map((footer) => (
              <Grid item xs={6} sm={3} key={footer.title}>
                <Typography sx={mode&&{color:'white'}} variant="h6" color="text.primary" gutterBottom>
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
          <Copyright sx={mode?{color:'white',mt: 5 }:{ mt: 5 }} />

        </Container>
        {/* End footer */}
      </ThemeProvider >
    </>
  );
}

const Backdrop = React.forwardRef((props, ref) => {
  const { openAdd, className, ...other } = props;
  return (
    <div
      className={clsx({ 'base-Backdrop-open': openAdd }, className)}
      ref={ref}
      {...other}
    />
  );
});

Backdrop.propTypes = {
  className: PropTypes.string.isRequired,
  openAdd: PropTypes.bool,
};

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

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const ModalContent = styled('div')(
  ({ theme }) => css`
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 500;
    text-align: start;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0 4px 12px
      ${theme.palette.mode === 'dark' ? 'rgb(0 0 0 / 0.5)' : 'rgb(0 0 0 / 0.2)'};
    padding: 24px;
    color: ${theme.palette.mode === 'dark' ? grey[50] : grey[900]};

    & .modal-title {
      margin: 0;
      line-height: 1.5rem;
      margin-bottom: 8px;
    }

    & .modal-description {
      margin: 0;
      line-height: 1.5rem;
      font-weight: 400;
      color: ${theme.palette.mode === 'dark' ? grey[400] : grey[800]};
      margin-bottom: 4px;
    }
  `,
);

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