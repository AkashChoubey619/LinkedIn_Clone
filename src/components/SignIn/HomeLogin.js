import React, { useContext, useEffect } from 'react'
import LoginHead from './LoginHead'
import LoginMain from './LoginMain'
import Context from '../ContextApi/MainContext';



export default function HomeLogin() {
  const { setMode,mode } = useContext(Context)

  useEffect(()=>{
      localStorage.setItem('token',null)
      localStorage.setItem('userData',null)
      setMode(false)
      console.log(mode,'login')
  },[])
     

  return  <div className='homeLogin'>
    <LoginHead />
    <LoginMain />
  </div>
}
