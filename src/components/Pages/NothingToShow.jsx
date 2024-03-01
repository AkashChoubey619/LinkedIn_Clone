import React, { useContext } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea } from '@mui/material';
import './Style.css';
import Nav from '../Header/Navigation';
import Context from '../ContextApi/MainContext';

function NothingToShow() {
  const { mode } = useContext(Context)
  return (
    <>
    <Nav/>
    <Box className="cardBox" >
       <Card sx={mode?{ maxWidth: 345,boxShadow:'0px 0px 10px white' }:{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://d7hftxdivxxvm.cloudfront.net/?height=801&quality=1&resize_to=fit&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FPBwXUmDBhHdM012zADWrWA%2Fsmall.jpg&width=801"
          alt="green iguana"
        />
        <CardContent sx={mode&&{background:'black',color:'white'}}>
          <Typography gutterBottom variant="h5" component="div">
            Nothing_To_Show
          </Typography>
          <Typography variant="body2" sx={mode&&{color:'white'}} color="text.secondary">
            You may enter wrong address please make sure that you have entered correct name(address name) on search bar
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </Box>
    </>
  )
}

export default NothingToShow
