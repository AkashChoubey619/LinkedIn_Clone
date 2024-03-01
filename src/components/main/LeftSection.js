import React,{useContext} from 'react'
import Avatar from '@mui/material/Avatar';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import GroupsIcon from '@mui/icons-material/Groups';
import Divider from '@mui/material/Divider';
import Context from '../ContextApi/MainContext';

import './Style.css'
import { Link } from 'react-router-dom';

export default function LeftSection(prop) {
    const userData = JSON.parse(localStorage.getItem("userData"))
    const {mode }= useContext(Context)
    var randomColor ='#'+ Math.floor(Math.random()*16777215).toString(16);
   
  
    return (
      <section id='left' style={{position:'sticky',top:'70px', maxWidth: '260px'}} >
        <section id='leftSide1' className={mode?'darkModeMain':''}>
          <div className='backImage'>
            <img style={{borderRadius:'9px 9px 0px 0px'}} 
            src='https://static.licdn.com/aero-v1/sc/h/55k1z8997gh8dwtihm11aajyq' alt='banner'/>
          </div>
          <div className='userInfo'>
            <div id='profileIcon'>
            <Link id='myId' to={'/myProfile'}>
            <Avatar
            src={prop}
              alt="Remy Sharp"
              sx={{ width: 56, height: 56,bgcolor:randomColor } }
  
            >
              {userData.name&&userData.name.toUpperCase().charAt(0)}
            </Avatar></Link></div>
            <h3 style={mode?{color:'white'}:{color:'black'}} >{userData.name&&userData.name}</h3>
            
            <p>Add Description about yourself</p>
          </div>
          <Divider sx={mode&&{bgcolor:'white'}}/>
          <div className='profileInfo'>
            <p>Who viewed your profile</p>
            <p>Impression on your post</p>
          </div>
          <Divider/>

          <Link to='/notAvailable' className='bookmark'>
          <div className='bookmark'>
           <BookmarkIcon/> <p>My Items</p>
          </div>
          </Link> 

        </section>
        <section id='leftSide2' className={mode?'darkModeMain':'modeMain'} >
          <div id='leftInfoHead'><h4 >Recent</h4></div>
          
          <div className='leftInfoData'><GroupsIcon/>JavaScript Developer</div>
          <div className='leftInfoData'><GroupsIcon/>Frontend Developer Group</div>
          <div className='leftInfoData'><GroupsIcon/>Web Design and Development</div>
          <Divider sx={mode&&{bgcolor:'white'}}/>
          <Link to='/notAvailable'>
          <button style={mode?{color:'white',background:'black'}:{}} id='leftMoreBtn'>Discover More</button>
          </Link>
  
        </section>
      </section>
    )
}
