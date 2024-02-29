import React, { useContext, useEffect, useState } from 'react';
import { Avatar, Box, Button, Grid, Paper, Stack, Typography, useMediaQuery, ThemeProvider, createTheme, TextField } from '@mui/material';
import Nav from '../Header/Navigation';
import Context from '../ContextApi/MainContext';
import AddIcon from '@mui/icons-material/Add';
import { css, styled } from '@mui/system';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Modal as BaseModal } from '@mui/base/Modal';
import { Link } from 'react-router-dom';
import { Dropdown } from '@mui/base/Dropdown';
import { Menu } from '@mui/base/Menu';
import { MenuButton as BaseMenuButton } from '@mui/base/MenuButton';
import ThreeDotsIcon from '@mui/icons-material/MoreHoriz';
import { MenuItem as BaseMenuItem, menuItemClasses } from '@mui/base/MenuItem';

export default function Network() {
  const myData = localStorage.getItem('userData')
  const myId = JSON.parse(myData)._id;
  const { mode, setGetId } = useContext(Context);
  const userData = JSON.parse(localStorage.getItem("userData"))
  const [groups, setGroups] = useState([]);

  const token = localStorage.getItem("token");
  const [createGroupInfo, setCreateGroupInfo] = React.useState({
    name: '',
    description: '',
    image: '',
  });

  const [openGroup, setOpenGroup] = React.useState(false);
  const handleOpenGroup = () => setOpenGroup(true);
  const handleCloseGroup = () => setOpenGroup(false);

  const handleCreateGroupInfo = (event) => {
    const { name, value } = event.target;
    setCreateGroupInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const fetchGroups = async () => {
    try {
      const res = await fetch(`https://academics.newtonschool.co/api/v1/linkedin/channel/`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          projectID: 'ut1dy4576cd1'
        },
      });

      if (res.ok) {
        const groupData = await res.json();
        const filteredPosts = groupData.data.filter(post => post !== null);
        setGroups(filteredPosts);
      }
    } catch (error) {
      console.log('groupsError ', error)
    }
  }

  const createGroup = async (event) => {
    event.preventDefault();
    let formData = new FormData();
    Object.entries(createGroupInfo).forEach(([key, value]) => {
      formData.append(key, value)
    })

    try {
      const res = await fetch(`https://academics.newtonschool.co/api/v1/linkedin/channel/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          projectID: 'ut1dy4576cd1'
        },
        body: formData,
      });

      if (res.ok) {
        const createGroupData = await res.json();
        console.log(createGroupData);
        fetchGroups()
      }
    } catch (error) {
      console.log('groupsError ', error)
    }
  }

  const deleteGroup = async (postId) => {
    try {
      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/linkedin/channel/${postId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            projectID: "ut1dy4576cd1",
          },
        }
      );

      if (response.ok) {
        console.log("Post deleted successfully");
        setGroups(() => groups.filter(
          (post) => post._id !== postId
        ),
        );

      } else {
        const errorPostData = await response.json();
        console.error("Post Error:", errorPostData);
      }
    } catch (error) {
      console.error("error:", error);
    }
  };


  useEffect(() => {
    fetchGroups();
  }, []);

  const suggestedPeople = [
    { name: 'John Doe', avatar: '/john-avatar.jpg', mutualConnections: 5 },
    { name: 'Jane Smith', avatar: '/jane-avatar.jpg', mutualConnections: 3 },
    { name: 'Alice Johnson', avatar: '/alice-avatar.jpg', mutualConnections: 7 },
    { name: 'Bob Brown', avatar: '/bob-avatar.jpg', mutualConnections: 2 },
    { name: 'Franklin', avatar: '/john-avatar.jpg', mutualConnections: 4 },
    { name: 'James Ron', avatar: '/jane-avatar.jpg', mutualConnections: 1 },
    { name: 'Johnson meth', avatar: '/alice-avatar.jpg', mutualConnections: 7 },
    { name: 'Olsen Eze', avatar: '/bob-avatar.jpg', mutualConnections: 0 },
    { name: 'John Doe', avatar: '/john-avatar.jpg', mutualConnections: 5 },
    { name: 'Jane Swish', avatar: '/jane-avatar.jpg', mutualConnections: 3 },
    { name: 'Mos Ul Win', avatar: '/alice-avatar.jpg', mutualConnections: 6 },
    { name: 'Rita Osman', avatar: '/bob-avatar.jpg', mutualConnections: 1 },
    { name: 'Franks', avatar: '/john-avatar.jpg', mutualConnections: 4 },
    { name: 'Joy Jho', avatar: '/jane-avatar.jpg', mutualConnections: 0 },
    { name: 'Kim Lau so', avatar: '/alice-avatar.jpg', mutualConnections: 1 },
    { name: 'Marry Owi', avatar: '/bob-avatar.jpg', mutualConnections: 2 }
  ];

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
  }

  // Create a theme
  const theme = createTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <ThemeProvider theme={theme}>
      <>
        <Nav />
        <Stack direction={isSmallScreen ? 'column' : 'row'} mx={isSmallScreen ? 1 : 3} mt={8}>
          <Box width={isSmallScreen ? '100%' : '40%'} mr={isSmallScreen ? 0 : 1}>
            <Paper sx={mode ? { bgcolor: 'black', padding: 2, marginBottom: 2, boxShadow: '0px 0px 3px lightgrey' }
              : { padding: 2, marginBottom: 2 }} elevation={3} >
              <Typography sx={mode && { color: 'white' }} variant="h5" gutterBottom>
                Groups
              </Typography>
              {groups && groups.map((group) => (
                <Paper key={group._id} elevation={3} sx={mode ? { padding: 2, marginBottom: 2, bgcolor: 'darkslategray', color: 'white', boxShadow: '0px 0px 5px white' }
                  : { padding: 2, marginBottom: 2 }}>
                  <Box sx={{ display: 'flex', width: '100%', alignItems: 'center' }}>
                    <Avatar src={group.image} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                      <Typography ml={2} variant="h6" gutterBottom>
                        {group.name}
                      </Typography>

                      <Box id={group._id}>
                        {userData._id === group.owner._id && (
                          <Dropdown sx={mode ? { bgcolor: 'darkslategray', color: 'white' } :
                            { bgcolor: 'white' }} id={group._id}>
                            <MenuButton id={group._id} sx={mode ? { bgcolor: 'darkslategray', color: 'white' } :
                              { bgcolor: 'white' }}>
                              <ThreeDotsIcon sx={mode ? {
                                bgcolor: 'darkslategray',
                                color: '#white', fontSize: '18px'
                              } : { fontSize: '18px', bgcolor: 'white' }} />
                            </MenuButton>
                            <Menu slots={{ listbox: Listbox }} sx={mode ? { bgcolor: 'grey', color: 'white' } : { bgcolor: 'white' }}>
                              <MenuItem
                                onClick={() => deleteGroup(group._id)}
                                id={group._id}>delete</MenuItem>
                            </Menu>
                          </Dropdown>
                        )}
                      </Box>
                    </Box>
                  </Box>

                  <Grid container spacing={2}>
                    <Box sx={{ padding: 1, margin: 2 }}>
                      <Typography>About - {group.description}</Typography>
                      <Typography variant="body2">Owner - {group.owner.name}</Typography>

                    </Box>

                  </Grid>
                  <Link to='/group' onClick={() => {
                    group._id && localStorage.setItem('getId', group._id);
                  }}>
                    <Typography sx={mode ? { textAlign: 'center', textDecoration: 'underline', fontStyle: 'italic', color: 'lightblue' }
                      : { textAlign: 'center', textDecoration: 'underline', fontStyle: 'italic' }}
                      variant='body2' component={'h4'}>
                      View  Group
                    </Typography>
                  </Link>
                </Paper>
              ))}

              <TriggerButton type='button' onClick={handleOpenGroup}
                sx={mode ? { display: 'flex', justifyContent: 'center', width: '100%', bgcolor: 'darkslategray' }
                  : { display: 'flex', justifyContent: 'center', width: '100%', color: 'white' }}>
                <AddIcon sx={mode && { color: 'white' }} />
              </TriggerButton>
              <Modal
                aria-labelledby="unstyled-modal-title"
                aria-describedby="unstyled-modal-description"
                open={openGroup}
                onClose={handleCloseGroup}
                slots={{ backdrop: StyledBackdrop }}
              >
                <ModalContent sx={mode ? { width: 400, bgcolor: 'black' } : { width: 400 }}>
                  <Paper style={mode ? { padding: '16px', marginBottom: '16px', background: 'darkslategray', color: 'white', boxShadow: '0px 0px 5px white' }
                    : { padding: '16px', marginBottom: '16px' }}>
                    <Typography variant="h6">Add Profile Image</Typography>
                    <form onSubmit={createGroup}>
                      <TextField
                        InputProps={{
                          sx: mode && { color: 'white ! important',}
                        }}
                        InputLabelProps={{
                          sx: mode && { color: 'white',outline:'white' }
                        }}
                        required
                        name="name"
                        label="name"
                        fullWidth
                        margin="normal"
                      />
                      <TextField
                       InputProps={{
                        sx: mode && { color: 'white ! important',}
                      }}
                      InputLabelProps={{
                        sx: mode && { color: 'white',outline:'white' }
                      }}
                        required
                        type="text"
                        id='name'
                        name="name"
                        label="Group name"
                        value={createGroupInfo.name}
                        onChange={handleCreateGroupInfo}
                        fullWidth
                        margin="normal"
                      />
                      <TextField
                       InputProps={{
                        sx: mode && { color: 'white ! important'}
                      }}
                      InputLabelProps={{
                        sx: mode && { color: 'white' }
                      }}
                        required
                        type="text"
                        id='description'
                        name="description"
                        label="Description"
                        value={createGroupInfo.description}
                        onChange={handleCreateGroupInfo}
                        fullWidth
                        margin="normal"
                      />
                      <input
                        required
                        type="file"
                        name="image"
                        value={createGroupInfo.image}
                        onChange={handleCreateGroupInfo}
                        // inputProps={{ accept: 'image/*' }}
                        fullWidth
                        margin="normal"
                      />

                      <Button onClick={handleCloseGroup} type="submit" variant="contained" color="primary">
                        Submit
                      </Button>

                    </form>
                  </Paper>
                </ModalContent>
              </Modal>

            </Paper>
          </Box>
          <Box width={isSmallScreen ? '100%' : '60%'}>
            <Paper elevation={3} sx={mode?{ padding: 2, marginInline: 1,background:'black',color:'white', boxShadow: '0px 0px 3px white' }:{ padding: 2, marginInline: 1 }}>
              <Typography variant="h6" gutterBottom>
                Suggested People
              </Typography>
              <Grid container spacing={2}>
                {suggestedPeople.map((person, index) => (
                  <Grid item xs={6} sm={4} md={3} key={index}>
                    <Paper elevation={3} sx={mode?{ padding: 2, backgroundColor: 'darkslategray', boxShadow: '0px 0px 5px white',color:'white', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }:
                  { padding: 2, backgroundColor: '#f0f0f0', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Avatar src={person.avatar} alt={person.name} sx={{ width: 80, height: 80 }} />
                        <Typography variant="subtitle1" sx={{ marginTop: 1 }}>
                          {person.name}
                        </Typography>
                        <FollowGroup />
                        <Typography variant="body2" sx={mode?{ color: 'white', marginTop: 1, }:{ color: 'text.secondary', marginTop: 1 }}>
                          Mutual Connections: {person.mutualConnections}
                        </Typography>
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Box>
        </Stack>
      </>
    </ThemeProvider>

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
const Listbox = styled('ul')(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0;
  min-width: 150px;
  border-radius: 12px;
  overflow: auto;
  outline: 0px;
  background: ${theme.palette.mode === 'dark' ? grey[900] : 'lightgrey'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  box-shadow: 0px 4px 6px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.50)' : 'rgba(0,0,0, 0.05)'
    };
  z-index: 1;
  `,
);

const MenuItem = styled(BaseMenuItem)(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  user-select: none;

  &:last-of-type {
    border-bottom: none;
  }

  &:hover {
    background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
    border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
  }

  &.${menuItemClasses.focusVisible} {
    outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }

  &.${menuItemClasses.disabled} {
    color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }

  &:hover:not(.${menuItemClasses.disabled}) {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[50]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }
  `,
);

const MenuButton = styled(BaseMenuButton)(

  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  padding: 0;
  border-radius: 8px;
  transition: all 150ms ease;
  cursor: pointer;
  border: none;
  `,
);
