import React, { useState } from 'react';
import styles from './sidebar.module.css'
// import {FiUsers} from 'react-icons/fi'
// import {BsBrowserEdge} from 'react-icons/bs'

import {FiUsers} from 'react-icons/fi'
import {BsBrowserEdge} from 'react-icons/bs'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeState, selectCurrentUser } from '../pages/Login/currentUser.slice';
import { Button } from 'antd';
import { ThunkDispatch } from '@reduxjs/toolkit';
const Sidebar = () => {
    const [active , setActive] = useState("users");

    const navigate = useNavigate()
        const dispatch = useDispatch<ThunkDispatch<any, any, any>>();


    const {user}= useSelector(selectCurrentUser)

    const handleSignOut =()=>{
        localStorage.removeItem("amryttUserToken");
        dispatch(removeState())
        navigate('/login')
    }

  return (
    <div className={styles.sidebar}>
      <ul>
        <li>
            <div className={`${styles.sidebarIcons} ${active==="users" && styles.ActiveSidebarIcon}`}
            
            onClick={()=>{
                setActive("users")
                navigate('/')
            }}

            >
                <div className={styles.sidebarIcon}>
                    <FiUsers/>
                </div>
                <div>Users</div>
            </div>
        </li>
        <li>
            <div className={`${styles.sidebarIcons} ${active==="websites" && styles.ActiveSidebarIcon}`}
                onClick={()=>{
                setActive("websites")
                navigate('/websites')
            }}


            >
                <div className={styles.sidebarIcon}>
                    <BsBrowserEdge/>
                </div>
            <div>Websites</div>
            </div>
        </li>
        
        <li style={{marginLeft:"-16px"}}>
            <Button
                style={{border:"none",borderRadius:"8px"}}
                onClick={handleSignOut}
            >SignOut</Button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
