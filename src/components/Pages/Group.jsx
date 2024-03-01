import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import { Avatar, Box, Card, CardContent, CardMedia, Checkbox, Divider, Paper, Stack, TextField, useMediaQuery } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import AddImage from '@mui/icons-material/AddPhotoAlternateOutlined';
import Menu from '@mui/material/Menu';
import Send from '@mui/icons-material/SendOutlined';
import FilledSend from '@mui/icons-material/Send';
import Like from '@mui/icons-material/ThumbUpAltOutlined';
import FilledLike from '@mui/icons-material/ThumbUpAlt';
import Comment from '@mui/icons-material/MarkUnreadChatAltOutlined';
import FilledComment from '@mui/icons-material/MarkUnreadChatAlt';
import Repost from '@mui/icons-material/RepeatSharp';
import FilledRepost from '@mui/icons-material/RepeatOnSharp';
import LeftSearchCard from './LeftSearchCard';
import PropTypes from 'prop-types';
import { css } from '@mui/system';
import { Modal as BaseModal } from '@mui/base/Modal';
import Nav from '../Header/Navigation';
import clsx from 'clsx';
import { useTheme } from '@mui/material/styles';


import Context from '../ContextApi/MainContext';

import { footers } from './Store';



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

export default function Group() {
  const myData = localStorage.getItem('userData')
  const myId = JSON.parse(myData)._id;
  const [previewUrl, setPreviewUrl] = React.useState('');
  const [userData, setUserData] = React.useState([])
  const [groupPostData, setGroupPostData] = React.useState([])
  const [myName, setMyName] = React.useState("")
  const [description, setDescription] = React.useState("")
  const { mode } = React.useContext(Context);
  const id = localStorage.getItem('getId');

  const [ownerId, setOwnerId] = React.useState('');

  const theme = useTheme();
  const isMdScreen = useMediaQuery(theme.breakpoints.up('md'));


  const [openAddImg, setOpenAddImg] = React.useState(false);
  const handleOpenAddImg = () => setOpenAddImg(true);
  const handleCloseAddImg = () => setOpenAddImg(false);

  const [openInfo, setOpenInfo] = React.useState(false);
  const handleOpenInfo = () => setOpenInfo(true);
  const handleCloseInfo = () => setOpenInfo(false);

  const myInfo = async function () {
    try {
      const res = await fetch(`https://academics.newtonschool.co/api/v1/linkedin/channel/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          projectID: 'ut1dy4576cd1'
        },

      });

      if (res.ok) {
        const data = await res.json();
        setUserData(data.data);
        fetchPosts()

      }
    } catch (error) {
      console.log('userDataError ', error)

    }

  }

  React.useEffect(() => {
    if (userData && userData.owner && userData.owner._id) {
      setOwnerId(userData.owner._id);
      console.log(userData._id, 'info');
      // Any other logic that depends on ownerId should be placed here
    } else {
      console.error('Owner data is missing or invalid:', userData);
    }
  }, [userData]);

  const fetchPosts = async () => {
    try {
      const res = await fetch(`https://academics.newtonschool.co/api/v1/linkedin/channel/${id}/posts`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          projectID: 'ut1dy4576cd1'
        },

      });

      if (res.ok) {
        const postData = await res.json();

        const filteredPosts = postData.data.filter(post => post !== null);
        setGroupPostData(filteredPosts);


      }
    } catch (error) {
      console.log('userDataError ', error)

    }

  }

  React.useEffect(() => {
    myInfo()
    window.scrollTo(0, 0)
  }, [])
  // console.log('Updated authors:', authors);

  const suggestionsData = [
    { id: 1, name: 'John Doe', occupation: 'Software Engineer' },
    { id: 2, name: 'Jane Smith', occupation: 'Data Scientist' },
    { id: 3, name: 'Alice Johnson', occupation: 'Product Manager' },
    // Add more suggestions as needed
  ];
  const [file, setFile] = React.useState('');
const handleFileChange = (event) => {
  const selectedFile = event.target.files[0];

  if (!selectedFile) return;

  const fileReader = new FileReader();
  fileReader.onload = () => {
    console.log('FileReader onload triggered');
    setPreviewUrl(fileReader.result);
  };
  fileReader.onerror = (error) => {
    console.error('FileReader error:', error);
  };
  fileReader.readAsDataURL(selectedFile);
  setFile(selectedFile);
  console.log('Reading file...');
};

  const handleSubmitAddImg = async (event) => {
    event.preventDefault();
    if (!file) {
      console.error('No file selected.');
      return;
    }
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await fetch(`https://academics.newtonschool.co/api/v1/linkedin/channel/${id}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          projectID: 'ut1dy4576cd1'
        },
        body: formData,
      });

      if (res.ok) {
        const profileImagData = await res.json();
        console.log('GroupImage:', profileImagData); 
        setOpenAddImg(!openAddImg);
        setFile('');
        window.location.reload(false);
      } else {
        console.error('Failed to update profile image:', res.statusText);
      }
    } catch (error) {
      console.error('Error updating profile image:', error);
      // Handle network errors or exceptions
    }
  };



  const handleEditName = async (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append("name", myName)
    formData.append("description", description)
    try {
      const res = await fetch(`https://academics.newtonschool.co/api/v1/linkedin/channel/${id}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          projectID: 'ut1dy4576cd1'

        },
        body: formData,
      })

      if (res.ok) {
        const myData = await res.json()
        console.log('educationData:', myData);
        setMyName('')
        setDescription('')
        setOpenInfo(!openInfo)
        myInfo()
      }
      else{
        console.log(myName,description,'infoData')
      }

    } catch (error) {
      console.error('MyDataError:', error);
    }
  }

  const FollowGroup = () => {
    const [isFollowing, setIsFollowing] = React.useState(false);

    const handleFollowToggle = () => {
      setIsFollowing(prevState => !prevState);
    };

    return (
      <>
        <Button
          variant={isFollowing ? 'outlined' : 'contained'}
          color={isFollowing ? 'secondary' : 'primary'}
          onClick={handleFollowToggle}
          size="small"
          sx={{ borderRadius: '16px' }}
        >
          {isFollowing ? 'Following' : 'Follow'}
        </Button>
      </>
    );
  };

  const Suggestion = ({ suggestion }) => {
    const [isFollowing, setIsFollowing] = React.useState(false);

    const handleFollowToggle = () => {
      setIsFollowing(prevState => !prevState);
    };

    return (
      <Paper elevation={3} sx={mode?{ p: 2, borderRadius: '8px',background:'black',color:'white',boxShadow:'0px 0px 4px white' }:{ p: 2, borderRadius: '8px' }}>
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



  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
        <Nav />

        {/* Hero unit */}
        {/* End hero unit */}

        <Container component="main" sx={{ mt: '65px', padding: '20px' }} >
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>

              <Stack spacing={3}>
                <Box >
                  <Box sx={mode?{ bgcolor: 'black',color:'white', borderRadius: '8px', mb: '15px' }
                  :{ bgcolor: 'white', borderRadius: '8px', mb: '15px' }}>
                    <div >
                      <img src='https://static.licdn.com/aero-v1/sc/h/55k1z8997gh8dwtihm11aajyq' alt='banner' />
                    </div>
                    <Box p={'19px'} sx={{ display: 'grid', placeItems: 'left' }} >
                      <Box sx={{ ml: '15px' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar alt="Remy Sharp"
                            src={userData.image}
                            sx={{
                              border: '2px solid white', fontSize: '80px',
                              mt: { xs: '-50px', sm: '-75px', md: '-100px' },
                              bgcolor: '#f3f6f9',
                              width: { xs: 80, sm: 110, md: 156 }, height: { xs: 80, sm: 110, md: 156 }
                            }}>
                            A</Avatar>
                          {ownerId === myId && <TriggerButton
                            sx={mode?{ ml: '-28px', zIndex: '20', borderRadius: '50%' ,background:'darkslategray',color:'white'}:
                            { ml: '-28px', zIndex: '20', borderRadius: '50%' }}darkslategray
                            type="button" onClick={handleOpenAddImg}>
                            <AddImage sx={mode&&{color:'white'}} />
                          </TriggerButton>}

                          <Modal
                            aria-labelledby="unstyled-modal-title"
                            aria-describedby="unstyled-modal-description"
                            open={openAddImg}
                            onClose={handleCloseAddImg}
                            slots={{ backdrop: StyledBackdrop }}
                          >
                            <ModalContent sx={mode?{ width: 400,background:'black',color:'white' }:{ width: 400 }}>
                              <Paper style={mode?{ padding: '16px', marginBottom: '16px',background:'black',color:'white' }:{ padding: '16px', marginBottom: '16px' }}>
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
                                    <Button component="span" sx={mode&&{color:'white'}} color="primary">
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

                        <Typography my={1} sx={{ ml: { md: '16px' }, textAlign: 'left' }} variant={'h5'}>
                          {userData.name}

                          {ownerId === myId && <TriggerButton onClick={handleOpenInfo} 
                          sx={mode?{ padding: 0, margin: 0, ml: '20px',background:'darkslategray',color:'white' }:{ padding: 0, margin: 0, ml: '20px', }}>
                            <EditIcon sx={mode&&{color:'white'}} />
                          </TriggerButton>}
                        </Typography>

                        <Modal
                          aria-labelledby="unstyled-modal-title"
                          aria-describedby="unstyled-modal-description"
                          open={openInfo}
                          onClose={handleCloseInfo}
                          slots={{ backdrop: StyledBackdrop }}
                        >
                          <ModalContent sx={mode?{background:'black', width: 400 }:{ width: 400 }}>
                            <Paper style={mode?{ padding: '16px', marginBottom: '16px',background:'black',color:'white' }:{ padding: '16px', marginBottom: '16px' }}>
                              <Typography variant="h6">Add Details</Typography>
                              <form onSubmit={handleEditName}>
                                <TextField
                                  required
                                  type="text"
                                  id='name'
                                  name="Name"
                                  label="Group name"
                                  value={myName}
                                  onChange={(e) => setMyName(e.target.value)}
                                  fullWidth
                                  InputProps={{sx:mode&&{color:'white',background:'darkslategray'}}}
                                  InputLabelProps={{ sx: { color: 'white',outline:'white' } }}
                                  margin="normal"
                                />
                                <TextField
                                  required
                                  type="text"
                                  id='description'
                                  name="description"
                                  label="Description"
                                  value={description}
                                  onChange={(e) => setDescription(e.target.value)}
                                  fullWidth
                                  InputProps={{sx:mode&&{color:'white',background:'darkslategray'}}}
                                  InputLabelProps={{ sx: { color: 'white',outline:'white' } }}
                                  margin="normal"
                                />

                                <Button onClose={handleCloseInfo} sx={{ m: 1, height: '30px' }}
                                  type="submit" variant="contained" color="primary">
                                  Submit
                                </Button>
                                <Button sx={mode?{color:'white',m: 1, height: '30px' }:{ m: 1, height: '30px' }}
                                  onClick={() => {
                                    setOpenInfo(false)
                                  }} variant="outlined" color="primary">
                                  Cancel
                                </Button>
                              </form>
                            </Paper>
                          </ModalContent>
                        </Modal>

                        <Typography sx={{ fontWeight: 700, color: "grey", ml: { xs: '4px', md: '16px' }, textAlign: 'left' }} variant={'p'}>
                          {userData.description}</Typography>
                      </Box>
                      <Stack alignItems={'center'} justifyContent={'space-between'} flexDirection={'row'}>
                        <Stack my={'16px'} flexDirection={'row'}>

                          <div style={{ marginLeft: '8px' }}>
                            <FollowGroup />
                          </div>
                          <div style={{ marginLeft: '8px' }}>
                            <Button
                              id="demo-customized-button"
                              variant="outlined"
                              disableElevation
                              size='small'
                              sx={mode?{borderRadius:'16px',color:'white'}:{ borderRadius: '16px' }}
                            >
                              more
                            </Button>
                          </div>
                        </Stack>

                      </Stack>
                    </Box>
                  </Box>

                  {/* <================suggestion===================> */}

                  <Box className='suggestion' style={mode?{bgcolor: 'black',color:'white',boxShadow:'0px 0px 4px white',marginBottom: '20px' }:
                  { marginBottom: '20px' }}>
                    <Paper style={mode?{ padding: 20,background:'black',color:'white' }:{ padding: 20 }}>
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

                  {/* <================Posts===================> */}
                  <Paper
                    style={mode?
                      {
                        margin: 'auto',
                        marginTop: 20, padding: 12,
                        background: 'black',color:'white',boxShadow:'0px 0px 4px white', width: '100%', maxWidth: '735px'
                      }:{
                      margin: 'auto',
                      marginTop: 20, padding: 12,
                      bgcolor: '#f3f6f9', width: '100%', maxWidth: '735px'
                    }}>

                    <Typography variant="h4" gutterBottom>Channel Posts</Typography>

                    <Grid spacing={2}>
                      {
                        groupPostData.length===0 ?
                          <Typography sx={{ textAlign: 'center', my: 2, color: 'grey' }} variant="h5">
                            <i>No Post</i></Typography>:  groupPostData.map((post, index) => (
                            <Grid key={post._id}>
                              <Card sx={mode?{ mb: 2,background:'black',color:'white' }:{ mb: 2 }}>
                                <CardContent >
                                  <Stack direction={'row'} spacing={2} alignItems={'center'} mb={1}>
                                    <Avatar>S</Avatar>
                                    <Typography variant="body2" component="h1">User_Someone</Typography>
                                  </Stack>
                                  <Typography mb={1} variant="h6" component="h4">
                                    {post.title}
                                  </Typography>
                                  <Typography mb={1} variant="body2" sx={mode&&{color:'white'}} color="textSecondary" component="h6">
                                    {post.content}
                                  </Typography>

                                  {post.images && (
                                    <CardMedia
                                      component="img"
                                      image={post.images[0]} // Assuming the first image is displayed
                                      alt={post.title}
                                    />
                                  )}
                                  <Divider sx={mode ? { bgcolor: 'white', m: 2 } : { m: 2 }} />
                                  {/* like,share,repost,send */}
                                  <div className='interactiveIcons' style={{ display: 'flex', alignItems: 'center' }}>

                                    {/* <<======================Like===============================>> */}

                                    <div className='like' style={{ marginRight: '10px' }}>
                                      <label htmlFor={`like` + index} style={{ cursor: 'pointer' }}
                                        className='interactiveIcons_custom'>
                                        <Checkbox sx={mode ? { color: 'white' } : ''} id={`like` + index} icon={<Like />}
                                          checkedIcon={<FilledLike />} />
                                        {isMdScreen && (<p className='icon_text'>Like</p>)}
                                      </label>
                                    </div>
                                    {/* <<======================Comment===============================>> */}
                                    <label htmlFor={`comment` + index} className='comment'>
                                      <div id={post._id} style={{ cursor: 'pointer' }} className='interactiveIcons_custom'>
                                        <Checkbox sx={mode ? { color: 'white' } : ''} id={`comment` + index}
                                          icon={<Comment />} checkedIcon={<FilledComment />} />
                                        {isMdScreen && (<p className='icon_text'>Comment</p>)}
                                      </div>

                                    </label>


                                    {/* <<======================repost===============================>> */}

                                    <label htmlFor={`repost` + index} className='repost'>
                                      <div style={{ cursor: 'pointer' }} className='interactiveIcons_custom'>
                                        <Checkbox sx={mode ? { color: 'white' } : ''} id={`repost` + index}
                                          icon={<Repost />} checkedIcon={<FilledRepost />} />
                                        {isMdScreen && (<p className='icon_text'>Repost</p>)}
                                      </div>
                                    </label>
                                    <div id={post._id} className='share'>

                                      {/* <<======================Send===============================>> */}

                                      <label htmlFor={`send` + index} style={{ cursor: 'pointer' }} className='interactiveIcons_custom'>
                                        <Checkbox sx={mode ? { color: 'white' } : ''}
                                          id={`send` + index} icon={<Send />} checkedIcon={<FilledSend />} />
                                        {isMdScreen && (<p className='icon_text'>Send</p>)}
                                      </label>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            </Grid>
                          ))
                      }
                    </Grid>
                  </Paper>

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
                <Typography variant="h6" sx={mode&&{ mt: 5 ,color:'white'}} color="text.primary" gutterBottom>
                  {footer.title}
                </Typography>
                <ul>
                  {footer.description.map((item) => (
                    <li key={item}>
                      <Link href="#"sx={mode&&{ mt: 5 ,color:'white'}} variant="subtitle1" color="text.secondary">
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Grid>
            ))}
          </Grid>
          <Copyright sx={mode?{ mt: 5 ,color:'white'}:{ mt: 5 }} />
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