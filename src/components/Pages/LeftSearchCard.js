import React from 'react'
import { LeftSearchData } from './Store'
import { Avatar, Box, Typography } from '@mui/material'
import ThreeDotsIcon from '@mui/icons-material/MoreHoriz';
import Tooltip from '@mui/material/Tooltip';
import Context from '../ContextApi/MainContext';


function LeftSearchCard() {
    const {mode}=React.useContext(Context);
    return (
        <section style={{ position: 'static', top: '10%' }}>
            {
                LeftSearchData.map((item, index) => {
                    return (
                        <Box key={index} borderRadius={2} mb={1}
                         sx={mode&&{background:'black',color:'white',boxShadow:'0px 0px 4px lightgrey'}} 
                          p={2} bgcolor={'white'} width={'260px'}>
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
                                  Location :  {item.location}
                                </Typography>
                            </Box>
                        </Box>
                        )
                    }
                    )

            }
        </section>
    )
}

export default LeftSearchCard;
