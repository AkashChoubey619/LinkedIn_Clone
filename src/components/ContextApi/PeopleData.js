import React, { useState } from 'react'
import UserContext from './MainContext.js'

export default function PeopleData({children}) {
    const [card,setCard]=useState([]);
    const [userData,setUserData]=useState([]);
    const [searchData,setSearchData]=useState([])
    const [getId,setGetId]=useState('');
    const [search, setSearch] = useState('')
    const [mode,setMode]=useState(false)
    let randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
  return (
    <UserContext.Provider value={{search, 
      setSearch,card,setCard,searchData,setSearchData,userData,setUserData,getId,setGetId,mode,setMode,randomColor
    }}>
      {children}
    </UserContext.Provider>
  )
}
