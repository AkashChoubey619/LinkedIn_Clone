import React, { useContext, } from 'react'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Avatar, Box, Divider, Typography, useMediaQuery, useTheme } from '@mui/material';
import RightSection from '../main/RightSection';
import Context from '../ContextApi/MainContext';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import Tooltip from '@mui/material/Tooltip';


import LeftSearchCard from './LeftSearchCard';
import Nav from '../Header/Navigation';
import { Link } from 'react-router-dom';


function SearchPage() {
  const { searchData, setSearchData, search ,mode} = useContext(Context);
  const theme = useTheme();
  const isMdScreen = useMediaQuery(theme.breakpoints.up('md'));
  const isSdScreen = useMediaQuery(theme.breakpoints.up('sm'));
  // const [word,setWord]=useState('')
  // setWord(search)

  const handelClick = () => {
    console.log(searchData)
    if (search.length !== 0) {
      fetch(`https://academics.newtonschool.co/api/v1/linkedin/post?search={"content":"${search}"}`, {

        headers: {
          projectID: 'ut1dy4576cd1'
        }
      }
      ).then((res) => {
        if (res.ok) {
          res.json()
        }

      }
      ).then(data => {
        setSearchData(data.data);

      }

      )
        .catch(error => console.log('Search_error:', error))
    }
  }

  return (
    <>
      <Nav />
      <Stack sx={{ position: 'absolute', top: '10%',ml: '4px', width: '98%', mr: '12px' }}>
        <Box sx={{marginInline: '8px'}}>
          <Stack flexWrap={'wrap'} spacing={2} sx={mode?{ padding: '12px', borderRadius: '6px', background: 'black',color:'white',boxShadow:'0px 0px 4px white' }:
        { padding: '12px', borderRadius: '6px', background: 'white' }} direction="row">
 
            <Button onClick={handelClick} sx={mode&&{ marginBottom: '10px',color:'white' }} color={"error"} type='checkbox' Checked variant="outlined">Posts</Button>

            <Link to='/people' >
            <Button onClick={handelClick} sx={mode&&{ marginBottom: '10px',color:'white' }} color="error" variant="outlined">People</Button>
            </Link>
            <Link to='/companies' >
              <Button onClick={handelClick} sx={mode&&{ marginBottom: '10px',color:'white' }} color="error" variant="outlined">Companies</Button>
            </Link>
            <Link to='/network' >
              <Button onClick={handelClick} sx={mode&&{ marginBottom: '10px',color:'white' }} color="error" variant="outlined">Groups</Button>
            </Link>
            <Link to='/products' >
              <Button onClick={handelClick} sx={mode&&{ marginBottom: '10px',color:'white' }} color="error" variant="outlined">Products</Button>
            </Link>
            <Link to='/jobs' >
              <Button onClick={handelClick} sx={mode&&{ marginBottom: '10px',color:'white' }} color="error" variant="outlined">Jobs</Button>
            </Link>
            <Link to='/events' >
              <Button onClick={handelClick} sx={mode&&{ marginBottom: '10px',color:'white' }} color="error" variant="outlined">Events</Button>
            </Link>
          </Stack>
        </Box>
        <Stack justifyContent={'center'} spacing={2} my={2} direction="row" >
          {isMdScreen && <LeftSearchCard />}
          <Stack flexWrap={'wrap'} sx={mode?{width:'580px',background:'black',color:'white',boxShadow:'0px 0px 4px white'}:{width:'580px',color:'black'}}  >
            <Typography p={1} bgcolor={mode?'black':'white'} color={mode?'white':'black'} borderRadius={'6px'} variant='h5'><i>Searched results of '{search}'</i>
              <Typography variant='body2'><i>{searchData.length === 0 ? 'result not found' : '--results-- ' + searchData.length}</i></Typography>
            </Typography>
            {
              searchData.length > 0 && searchData.map((item, index) => {
                return (
                  <Box my={1} borderRadius={2} bgcolor={mode?'black':'white'} sx={mode&&{boxShadow:'0px 0px 4px white'}} color={mode?'white':'black'} padding={1} key={index} flexItem>
                    <Stack spacing={1} my={1} flexDirection={'row'} sx={{ p: '5px', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <Link id={item._id} to={'/userProfile'} onClick={() => {
                        item.author._id &&
                          localStorage.setItem('getId', item.author._id);
                        console.log(item.author._id);
                      }}
                      ><Avatar src={item.author.profileImage} /></Link>
                        <Link id={item._id} to={'/userProfile'} onClick={() => {
                        item.author._id &&
                          localStorage.setItem('getId', item.author._id);
                        console.log(item.author._id);
                      }}
                      ><Typography sx={mode?{color:'white'}:{color:'black'}} fontSize={15}>{item.author.name}</Typography></Link>
                      </div>
                      <Tooltip title='Public' arrow><DynamicFeedIcon /></Tooltip>
                    </Stack>
                    <Typography>{item.title}</Typography>
                    <Typography my={1} variant='body2'>{item.content}</Typography>
                    <Divider />
                    <Stack flexDirection={'row'} sx={{ p: '5px', justifyContent: 'space-between' }} >

                      <Typography>Likes {item.likeCount}</Typography>
                      <Typography>Comments {item.commentCount}</Typography>
                    </Stack>

                  </Box>

                )
              }
              )

            }
          </Stack>

          {isSdScreen && <RightSection sx={{ marginTop: '-10px' }} />}
        </Stack>

      </Stack >
    </>
  )
}

export default SearchPage
