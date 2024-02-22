import React, { useContext } from 'react'
import { LeftSearchData } from './Store'
import { Avatar, Box, Stack, Typography } from '@mui/material'
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


export default function Jobs() {
    const { mode } = useContext(Context)

    return (
        <>
            <Nav />
            <Stack flexDirection={'row'} className='jobs' sx={{ position: 'absolute', top: '8%' }}>

                <Box width={'800px'} >
                    <Typography sx={{ textShadow: ' 3px 3px 20px #ff99cc,-2px 1px 30px #ff99cc', textAlign: 'center', color: 'white' }} mt={2} variant='h3'>
                        ---Recent Jobs---
                    </Typography>
                    {
                        LeftSearchData.map((item, index) => {
                            return (
                                <Box key={index} borderRadius={2} m={2} p={2}
                                    sx={mode ? { color: 'white', bgcolor: 'black',boxShadow:'0px 0px 4px gray' } 
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
                                        <Typography variant='body2'>
                                            Location :  {item.location}
                                        </Typography>
                                    </Box>
                                    <Accordion sx={mode ? { color: 'white', bgcolor: 'black',boxShadow:'0px 0px 4px gray' }:{ boxShadow: 'none' }} >
                                        <AccordionSummary 
                                            expandIcon={<ExpandMoreIcon sx={mode ? { color: 'white'}:''}/>}
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
                <RightSection />
            </Stack>
        </>
    )
}
