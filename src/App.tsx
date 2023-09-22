import React from 'react';
import './App.css';
import {Route,Routes} from 'react-router-dom'
import Login from './pages/Login/Login';
import Sidebar from './components/Sidebar';
import Users from './pages/Users/Users';
import Websites from './pages/Websites/Websites';
import SideDrawer from './components/Drawer';

function App() {
  return (
   <div className='appContainer'>
      {/* <Sidebar/> */}
      <SideDrawer/>
      <div style={{width:"100%"}}>
        <Routes>
          <Route path='/' element={<Users/>}/>
          <Route path='/websites' element={<Websites/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </div>
   </div>



  );
}

export default App;
