import React,{useContext} from 'react'
import AnnouncementIcon from '@mui/icons-material/Announcement';
import ThreeDotsIcon from '@mui/icons-material/MoreHoriz';
import Context from '../ContextApi/MainContext';

import { Avatar, Box, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';

export default function RightSection({prop}) {
  const {mode }= useContext(Context)

  return (
    <section id='right' style={{...prop}}  >
      <div id='rightSide1' className={mode?'darkModeMain':'ModeMain'}>
        <div id='rightHead'>
          <h5 id='rightHeadNews'>LinkedIn News</h5> 
          <Tooltip title='Info about top tech companies'><AnnouncementIcon/></Tooltip></div>
        <div className='newsFeed'>
          <ul id='newsList'>
            <li><Link to='/news' className={mode&&'listColor'}>IT major risk profile here</Link></li>
            <li>2hr ago</li>
            <li><Link to='/news' className={mode&&'listColor'}>Global accounting firms go local</Link></li>
            <li>4hr ago</li>
            <li><Link to='/news' className={mode&&'listColor'}>classrooms get diverse</Link></li>
            <li>4hr ago</li>
            <li><Link to='/news' className={mode&&'listColor'}>Travel loan-risk in non-metros</Link></li>
            <li>5hr ago</li>
            <li><Link to='/news' className={mode&&'listColor'}>Vehicle financing to zoom ahead </Link></li>
            <li>6hr ago</li>
            <li><Link to='/news' className={mode&&'listColor'}>Google CEO may change </Link></li>
            <li>6hr ago</li>
            <li><Link to='/news' className={mode&&'listColor'}>A piece of land is left in the sea </Link></li>
            <li>6hr ago</li>
            <li><Link to='/news' className={mode&&'listColor'}>Suffering, not something unknown for a skinflint</Link></li>
            <li>6hr ago</li>
            <li><Link to='/news' className={mode&&'listColor'}>LinkedIn's turn to fall over</Link></li>
            <li>6hr ago</li>
            <li><Link to='/news' className={mode&&'listColor'}>Dutch government in panic mode over keeping ASML in the country </Link></li>
            <li>6hr ago</li>
          </ul>
        </div>
      </div>
      <div id='rightSide2' className={mode?'darkModeMain':''}  style={{position:'sticky',top:70}}>
        <div id='rightSectionHead2'>
        <p style={{display:'flex',alignItems:'center'}}>Ad <Tooltip title='Subscription'><ThreeDotsIcon/></Tooltip></p>
        </div>
        <Box sx={{display:'flex',justifyContent:'center',mb:'5px'}}>
          <Link to='/jobs'><Avatar sx={{height:'52px',width:'52px'}}>Li</Avatar></Link>
        </Box>
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
