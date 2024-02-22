import React from 'react';
import './App.css';
// import Nav from './components/Header/Navigation';
import Router from './Router';
import { BrowserRouter } from 'react-router-dom';



function App() {
  document.querySelector('body').style.backgroundColor = "#f2f2f2";
 

  return (
    <BrowserRouter>
      <Router/>
    </BrowserRouter>
  );
}

export default App;
