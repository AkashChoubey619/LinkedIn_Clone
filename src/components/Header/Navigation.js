import React, { useContext, useState } from 'react';
import './Style.css';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Avatar, Box, Typography, useMediaQuery } from '@mui/material';
// import ListItemText from '@mui/material/ListItemText';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import WorkIcon from '@mui/icons-material/Work';
import MessageIcon from '@mui/icons-material/Message';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Container from '@mui/material/Container';
import { Dropdown } from '@mui/base/Dropdown';
import { styled } from '@mui/system';
import { Menu } from '@mui/base/Menu';
import { MenuButton as BaseMenuButton } from '@mui/base/MenuButton';
import { MenuItem as BaseMenuItem, menuItemClasses } from '@mui/base/MenuItem';
import Stack from '@mui/material/Stack';
import SearchIcon from '@mui/icons-material/Search';
import Divider from '@mui/material/Divider';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useTheme,createTheme } from '@mui/material/styles';
import Context from '../ContextApi/MainContext';


export default function Nav() {
  const [isMenu, setIsMenu] = useState(false);
  const { setSearchData, search, setSearch, mode, setMode } = useContext(Context);
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("userData"))
  // const token = localStorage.getItem("token");
  const color = document.querySelector('body')
  const customTheme= createTheme({
    breakpoints: {
      values: {
        min: 450,
      }}
    })
  const theme = useTheme();
  
  const isXsScreen = useMediaQuery(customTheme.breakpoints.down('min'));
  const isMdScreen = useMediaQuery(theme.breakpoints.up('md'));
  const isSmScreen = useMediaQuery(theme.breakpoints.up('sm'));
  mode ? color.style.backgroundColor = "rgb(14, 13, 13)" : color.style.backgroundColor = "#f2f2f2";

  // <=========================materialUi theme======================================>

  const Listbox = styled('ul')(
    ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0;
  min-width: 200px;
  border-radius: 12px;
  overflow: auto;
  outline: 0px;
  background: ${mode ? 'black' : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  color: ${mode ? 'white' : grey[900]};
  box-shadow: 0px 4px 6px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.50)' : 'rgba(0,0,0, 0.05)'
      };
  z-index: 1;
  `,
  );


  const handelMenu = () => {
    setIsMenu(!isMenu);
  }
  const handelSearch = async () => {
    // console.log(searchData.length)
    try {

      if (search.length !== 0) {
        const searched = await fetch(`https://academics.newtonschool.co/api/v1/linkedin/post?search={"author.name":"${search}"}`, {

          headers: {
            projectID: 'ut1dy4576cd1'
          }
        }
        )
        const res = await searched.json();
        if (searched.ok) {
          setSearchData(res.data)
          console.log(res)
        }
        else {
          setSearchData('')
        }
        navigate('/search')
      }
    } catch (error) {
      console.log(error)
    }



  }


  const handelSignOut = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("userData")
    setMode(!mode)
    navigate('/')

  }

  return (
    <div style={{ backgroundColor: 'white', position: 'relative' }} >
      <nav container aria-label="navigation bar head" className={mode ? 'mode' : ''} id='navigation' direction="row">
        <Container fixed >
          <Box display="flex" direction="row" justifyContent="space-between">
            {/* left section */}
            <Stack display="flex" direction="row" alignItems="center">
              
              <div >
                <LinkedInIcon sx={{ width: "4rem", height: "45px", color: "#0a66c2" }} />
                </div>
                
              <Box className='search'>
                <input type='text' id='search' value={search} onChange={(e) => setSearch(e.target.value)}
                  placeholder='Search' /><SearchIcon onClick={handelSearch} />
                {/* <button>ok</button> */}
              </Box>
            </Stack>
            {/* right section */}
            <Box >
              {/* icon */}

              <Stack direction="row" alignItems='center'  spacing={2} m={0.8}>
                {isSmScreen&&(
                <Stack direction="row" alignItems='center' spacing={2} m={0.8}>
                  <div >
                    <NavLink to='/home' className={mode ? 'navIcon' : 'icon'} ><HomeIcon />
                      {isMdScreen && (
                        <div>Home</div>
                      )}
                    </NavLink></div>
                  <div ><Link to='/network' className={mode ? 'navIcon' : 'icon'}><PeopleIcon />
                    {isMdScreen && (
                      <div>My Network</div>
                    )}
                  </Link></div>
                  <div ><Link to='/message' className={mode ? 'navIcon' : 'icon'}><MessageIcon />
                    {isMdScreen && (
                      <div>Message</div>
                    )}
                  </Link></div>
                  <div ><Link to='/jobs' className={mode ? 'navIcon' : 'icon'}><WorkIcon />
                    {isMdScreen && (
                      <div>Jobs</div>
                    )}
                  </Link></div>
                  <div ><Link to='/notify' className={mode ? 'navIcon' : 'icon'}><NotificationsIcon />
                    {isMdScreen && (
                      <div>Notifications</div>
                    )}
                  </Link>
                  </div>
                </Stack>)}
                <Divider orientation="vertical" flexItem />
                <div className='icon meIcon'>
                {userData&&<Avatar src={userData.profileImage} sx={{ width: 25, height: 25, ml: '-7px' }}>{userData.name.toUpperCase().charAt(0)}</Avatar>}
                  <div id='profile'>
                    <Dropdown>

                      <MenuButton className={mode ? 'mode' : ''} onClick={handelMenu} id='me-btn'>
                        Me <ArrowDropDownIcon /></MenuButton>

                      {/* dropdownMenu */}

                      <Menu slots={{ listbox: Listbox }} >
                        <div id='menuProfileIcon' className={mode ? 'mode' : ''}>

                          {userData&&<Avatar src={userData.profileImage} sx={{ width: 28, height: 28, fontSize: '12px' }}>
                            {userData.name.toUpperCase().charAt(0)}
                          </Avatar>}
                          <h3>
                            {userData.name}
                          </h3>

                        </div>
                        <Link to='myProfile'>
                          <button style={mode ? { background: 'black', color: 'white' } : {}}
                            id='viewProfile-btn'>View Profile</button>
                        </Link>
                        <Typography ml={1}>Account</Typography>
                        <MenuItem><Link className='menuText' to='/premium'>Try premium for free</Link></MenuItem>
                        <MenuItem><Link className='menuText' to='/updatePassword'>Update password</Link></MenuItem>
                        <MenuItem><Link className='menuText' to='/notAvailable'>Help</Link></MenuItem>
                        <MenuItem><Link className='menuText' to='/notAvailable'>Language</Link></MenuItem>
                        <Divider />
                        <Typography ml={1}>Manage</Typography>
                        <MenuItem><Link className='menuText' to='/notAvailable'>Post & Activity</Link></MenuItem>
                        <MenuItem><Link className='menuText' onClick={() => setMode(!mode)}>

                          {mode ? 'Light ' : 'Dark '}mode</Link></MenuItem>
                        <Divider />
                        <MenuItem>
                          <button style={mode ? { background: 'black', color: 'white' } : {}}
                            onClick={handelSignOut} id='signOut-btn'>
                            Sign Out
                          </button>
                        </MenuItem>
                      </Menu>
                    </Dropdown>
                  </div>

                </div>
              </Stack>
            </Box>
          </Box>
        </Container>

      </nav>
    </div >
  )
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
  font-weight: 500;

  transition: all 150ms ease;
  cursor: pointer;
  border: none;
  `,
);