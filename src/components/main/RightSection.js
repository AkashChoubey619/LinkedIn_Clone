import React,{useContext} from 'react'
import AnnouncementIcon from '@mui/icons-material/Announcement';
import ThreeDotsIcon from '@mui/icons-material/MoreHoriz';
import Context from '../ContextApi/MainContext';

import { Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';

export default function RightSection() {
  const {mode }= useContext(Context)

  return (
    <section id='right'  >
      <div id='rightSide1' className={mode?'darkModeMain':''}>
        <div id='rightHead'>
          <h5 id='rightHeadNews'>LinkedIn News</h5> 
          <Tooltip title='Info about top tech companies'><AnnouncementIcon/></Tooltip></div>
        <div className='newsFeed'>
          <ul id='newsList'>
            <li>IT major risk profile here</li>
            <li>2hr ago</li>
            <li>Global accounting firms go local</li>
            <li>4hr ago</li>
            <li>IIm classrooms get diverse</li>
            <li>4hr ago</li>
            <li>Travel loan-risk in non-metros</li>
            <li>5hr ago</li>
            <li>Vehicle financing to zoom ahead </li>
            <li>6hr ago</li>
            <li>Google CEO may change </li>
            <li>6hr ago</li>
            <li>Hiring percent of this is 20% less then past year </li>
            <li>6hr ago</li>
          </ul>
        </div>
      </div>
      <div id='rightSide2' className={mode?'darkModeMain':''}  style={{position:'sticky',top:70}}>
        <div id='rightSectionHead2'>
        <p style={{display:'flex',alignItems:'center'}}>Ad <Tooltip title='Subscription'><ThreeDotsIcon/></Tooltip></p>
        </div>
        <div id='rightSection2Content'>
        <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita officiis rerum neque modi natus atque dolorem harum nam debitis quos itaque nemo vitae nesciunt accusamus, unde amet praesentium dolorum maiores?</div>
        <Link to='/premium'><button id='rightSideLearnMoreBtn' className={mode?'darkModeMain':''}>
          Learn More
          </button></Link>
        </div>
      </div>
    </section>
  )
}
