import React, { useContext, useEffect } from 'react'
import LoginHead from './LoginHead'
import LoginMain from './LoginMain'
import Context from '../ContextApi/MainContext';



export default function HomeLogin() {
  const { setMode } = useContext(Context)

  useEffect(()=>{
      localStorage.setItem('token',null)
      localStorage.setItem('userData',null)
      setMode(false)
  })
     

  return  <div className='homeLogin'>
    <LoginHead />
    <LoginMain />
  </div>
}
