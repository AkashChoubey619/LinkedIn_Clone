import React, { useContext,} from 'react'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Avatar, Box, Divider, Typography } from '@mui/material';
import RightSection from '../main/RightSection';
import Context from '../ContextApi/MainContext';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import Tooltip from '@mui/material/Tooltip';


import LeftSearchCard from './LeftSearchCard';
import Nav from '../Header/Navigation';


function SearchPage() {
  const { searchData, setSearchData, search } = useContext(Context);
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
        if (res.ok){
          res.json()
        }
        
      }
      ).then(data => {
        setSearchData(data.data);

      }
      
      )
        .catch (error => console.log('Search_error:', error))
}
  }

return (
  <>
  <Nav/>
    <Stack sx={{ position: 'absolute', top: '10%', ml: '12px', width: '98%', mr: '12px' }}>
      <Box>
        <Stack spacing={2} sx={{ padding: '12px', borderRadius: '6px', background: 'white' }} direction="row">
          <Button onClick={handelClick} color="error" type='checkbox' defaultChecked variant="outlined">Posts</Button>
          <Button onClick={handelClick} color="error" variant="outlined">People</Button>
          <Button onClick={handelClick} color="error" variant="outlined">Companies</Button>
          <Button onClick={handelClick} color="error" variant="outlined">Groups</Button>
          <Button onClick={handelClick} color="error" variant="outlined">Products</Button>
          <Button onClick={handelClick} color="error" variant="outlined">Jobs</Button>
          <Button onClick={handelClick} color="error" variant="outlined">Events</Button>
          <Button onClick={handelClick} color="error" variant="outlined">Schools</Button>
        </Stack>
      </Box>
      <Stack justifyContent={'center'} spacing={2} my={2} direction="row" >
        <LeftSearchCard />
        <Stack flexWrap={'wrap'} width={'580px'} >
          <Typography p={1} bgcolor={'white'} borderRadius={'6px'} variant='h5'><i>Searched results of '{search}'</i>
            <Typography variant='body2'><i>{searchData.length === 0 ? 'result not found' : '--results-- ' + searchData.length}</i></Typography>
          </Typography>
          {
            searchData.length > 0 && searchData.map((item, index) => {
              return (
                <Box my={1} borderRadius={2} bgcolor={'white'} padding={1} key={index} flexItem>
                  <Stack spacing={1} my={1} flexDirection={'row'} sx={{ p: '5px', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <Avatar src={item.author.profileImage} />
                      <Typography fontSize={15}>{item.author.name}</Typography>
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

        <RightSection />
      </Stack>

    </Stack >
  </>
)
}

export default SearchPage
