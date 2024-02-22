import React, { useEffect } from 'react'
import LoginHead from './LoginHead'
import LoginMain from './LoginMain'



export default function HomeLogin() {


  useEffect(()=>{
      localStorage.setItem('token',null)
      localStorage.setItem('userData',null)
  })
     

  return  <div className='homeLogin'>
    <LoginHead />
    <LoginMain />
  </div>
}
