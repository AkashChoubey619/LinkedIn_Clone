import { Avatar, Box, Stack, Tooltip, Typography } from '@mui/material'
import React,{useContext} from 'react'
import ThreeDotsIcon from '@mui/icons-material/MoreHoriz';
import { LeftSearchData } from './Store'
import Nav from '../Header/Navigation';
import Context from '../ContextApi/MainContext';

export default function Notification() {
    const {mode }= useContext(Context)
  return (
    <Stack  sx={{  position: 'absolute', top: '8%',width:'100%' }}>
       <Typography sx={{textShadow:' 3px 3px 20px #ff99cc,-2px 1px 30px #ff99cc',textAlign:'center',color:'white'}}
       
       mt={2} variant='h3'>
        ---Notifications---
        </Typography>
      <Stack flexDirection={'column'} justifyContent={'center'} >

{
    LeftSearchData.map((item, index) => {
        return (
            <>
            <Nav/>
            <Box key={index} borderRadius={2} mt={1} mx={5} p={2} 
            sx={mode?{bgcolor:'black',color:'white',boxShadow:'0px 0px 3px gray'}:{bgcolor:'white'}}
            >
                <div className='head-details card'>
                    <div className='companies-Info'>
                        <Avatar src={item.image}>a</Avatar>
                        <h2 className='Card-head'>{item.name}</h2>
                    </div>
                    <Tooltip title='More Info'><ThreeDotsIcon /></Tooltip>
                </div>
                <Typography variant='body2'>{item.name} is hiring for {item.role}, don't forgot to apply</Typography>
            </Box>
            </>
        )
    }
    )

}
</Stack>
      
    </Stack>
  )
}
