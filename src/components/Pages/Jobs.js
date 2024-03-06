import React, { useContext } from 'react'
import { LeftSearchData } from './Store'
import { Avatar, Box, Button, Paper, Stack, Typography, useMediaQuery } from '@mui/material'
import ThreeDotsIcon from '@mui/icons-material/MoreHoriz';
import Accordion from '@mui/material/Accordion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Tooltip from '@mui/material/Tooltip';
import './Style.css'
import RightSection from '../main/RightSection';
import Nav from '../Header/Navigation';
import Context from '../ContextApi/MainContext';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';


export default function Jobs() {
    const { mode } = useContext(Context)
    const theme = useTheme();
    const isSmScreen = useMediaQuery(theme.breakpoints.up('sm'))

    React.useEffect(() => {
        // Scroll to the top of the page when the component mounts
        window.scrollTo(0, 0);
      }, []);

    return (
        <>
            <Nav />
            <Stack flexDirection={'row'} className='jobs' sx={{ position: 'absolute', top: '8%' }}>

                <Box width={'800px'} >
                    <Paper
                        sx={mode?{
                            backgroundColor: 'black',
                            padding: 2,
                            mx: 2,
                            borderRadius: 2,
                            color:'white',
                            boxShadow: '0px 0px 4px gray',
                            my: 2 // Adjust the maximum width to fit within the viewport
                        }:{
                            backgroundColor: 'white',
                            boxShadow: (theme) => theme.shadows[3],
                            padding: 2,
                            mx: 2,
                            borderRadius: 2,
                            my: 2 // Adjust the maximum width to fit within the viewport
                        }}
                    >
                        <Typography variant='h6'>
                            Top job picks for you
                        </Typography>
                        <Typography variant='body'>
                            Based on your profile and search history
                        </Typography>

                    </Paper>
                    {
                        LeftSearchData.map((item, index) => {
                            return (
                                <Box key={index} borderRadius={2} m={2} p={2}
                                    sx={mode ? { color: 'white', bgcolor: 'black', boxShadow: '0px 0px 4px gray' }
                                        : { color: 'black', bgcolor: 'white' }}>
                                    <div className='head-details card'>
                                        <div className='companies-Info'>
                                            <Avatar src={item.image}>a</Avatar>
                                            <h2 className='Card-head'>{item.name}</h2>
                                        </div>
                                        <Tooltip title='More Info'><ThreeDotsIcon /></Tooltip>
                                    </div>
                                    <Box ml={1} my={1} className='details-card'>
                                        <Typography variant='body'>
                                            Role : {item.role}
                                        </Typography>
                                        <Typography variant='body2'>
                                            Salary : {item.Salary}
                                        </Typography>
                                        <Typography variant='body'>
                                            Min-Experience - {item.exp}
                                        </Typography>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography variant='body2'>
                                                Location :  {item.location}
                                            </Typography>
                                            <Link to='/viewJobs'><Button variant='contained' sx={{ borderRadius: '20px', textTransform: 'none' }} >
                                                Apply
                                            </Button></Link>
                                        </Box>
                                    </Box>
                                    <Accordion sx={mode ? { color: 'white', bgcolor: 'black', boxShadow: '0px 0px 4px gray' } : { boxShadow: 'none' }} >
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon sx={mode ? { color: 'white' } : ''} />}
                                        >
                                            Know More
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            {item.description}
                                        </AccordionDetails>
                                    </Accordion>
                                </Box>
                            )
                        }
                        )

                    }
                </Box>
                {isSmScreen && <RightSection prop={{ marginTop: '16px' }} />}
            </Stack>
        </>
    )
}
