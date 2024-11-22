import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomeLogin from './components/SignIn/HomeLogin.js'
import Signup from './components/SignUp/Signup.js'
import Nav from './components/Header/Navigation.js'
import PeopleData from './components/ContextApi/PeopleData.js'
import Home from './components/main/Home.js'
import SearchPage from './components/Pages/SearchPage.js'
import NothingToShow from './components/Pages/NothingToShow.jsx'
import PeoplesProfile from './components/Pages/PeoplesProfile.jsx'
import UserProfile from './components/Pages/UserProfile.jsx'
import Message from './components/Pages/Message.js'
import Network from './components/Pages/Network.js'
import Notification from './components/Pages/Notification.js';
import Jobs from './components/Pages/Jobs.js'
import UpdatePassword from './components/Pages/UpdatePassword.jsx'
import Premium from './components/Pages/Premium.jsx'
import NotAvailable from './components/Pages/NotAvailable.jsx'
import Group from './components/Pages/Group.jsx'
import LoginHead from './components/SignIn/LoginHead.js'






export default function Router() {
  const token = localStorage.getItem("token");


  return (

    <PeopleData>
      {
        token === null ? <LoginHead/> : ""
      }
      <Routes>

        <Route path="/" index element={<HomeLogin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/userProfile" element={<PeoplesProfile />} />
        <Route path="/myProfile" element={<UserProfile />} />
        <Route path="/message" element={<Message />} />
        <Route path="/group" element={<Group />} />
        <Route path="/notify" element={<Notification />} />
       <Route path="/network" element={<Network />}/>
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/updatePassword" element={<UpdatePassword />} />
        <Route path="/premium" element={<Premium />} />
        <Route path="/notAvailable" element={<NotAvailable />} />
        <Route path="*" element={<NothingToShow />} />

      </Routes>


    </PeopleData>
  )
}
