import React from 'react';
import './Style.css';
import Nav from '../Header/Navigation';
import { Outlet } from 'react-router-dom';
import Main from './Main'


function App() {
  document.querySelector('body').style.backgroundColor = "#f2f2f2";
  return (
    < >
      <Nav/>
      <Main/>
    </>
  );
}

export default App;
