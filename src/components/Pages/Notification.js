import { Avatar, Box, Grid, Paper, Stack, Tooltip, Typography, useMediaQuery } from '@mui/material'
import React, { useContext } from 'react'
import ThreeDotsIcon from '@mui/icons-material/MoreHoriz';
import { LeftSearchData } from './Store'
import { styled } from '@mui/system';
import RightSection from '../main/RightSection';
import Nav from '../Header/Navigation';
import Context from '../ContextApi/MainContext';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';


export default function Notification() {
    const { mode } = useContext(Context)
    const theme = useTheme();
    const isSmScreen = useMediaQuery(theme.breakpoints.up('sm'))
    return (
        <>
            <Nav />
            <Stack flexDirection={'row'} className='jobs' sx={{ position: 'absolute', top: '55px' }}>

                <Box width={'800px'} >
                    <Paper
                         sx={mode?{
                            backgroundColor: 'black',
                            padding: 2,
                            mx: 5,
                            borderRadius: 2,
                            color:'white',
                            boxShadow: '0px 0px 4px gray',
                            my: 2 // Adjust the maximum width to fit within the viewport
                        }:{
                            backgroundColor: 'white',
                            boxShadow: (theme) => theme.shadows[3],
                            padding: 2,
                            mx: 5,
                            borderRadius: 2,
                            my: 2 // Adjust the maximum width to fit within the viewport
                        }}
                    >
                        <Typography variant='h6'>
                            Manage your Notifications
                        </Typography>
                    </Paper>
                    {
                        LeftSearchData.map((item, index) => {
                            return (
                                <Link key={index} to='/notAvailable'>
                                    <Box
                                        borderRadius={2}
                                        mx={5}
                                        p={2}
                                        sx={{
                                            bgcolor: mode ? 'black' : '#d6d6e5',
                                            color: mode ? 'white' : 'black',
                                            boxShadow: mode ? '0px 0px 3px gray' : 'none',
                                            '&:hover': {
                                                background: mode ? '#ebebf1' : '#f3f3f3',
                                                color: mode ? 'grey' : 'inherit'
                                            }
                                        }}
                                    >
                                        <div className='head-details card'>
                                            <div className='companies-Info'>
                                                <Avatar src={item.image}>a</Avatar>
                                                <h2 className='Card-head'>{item.name}</h2>
                                            </div>
                                            <Tooltip title='More Info'><ThreeDotsIcon /></Tooltip>
                                        </div>
                                        <Typography variant='body2'>
                                            {item.name} is hiring for {item.role}, don't forget to apply
                                        </Typography>
                                    </Box>
                                </Link>
                            )
                        }
                        )

                    }
                </Box>
                {isSmScreen&&<RightSection />}
            </Stack>
        </>
    )
}
