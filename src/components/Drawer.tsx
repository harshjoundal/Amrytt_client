import React ,{useState} from 'react'
import {Button,Drawer} from "antd"
import styles from "./drawer.module.css"
import {ImMenu} from "react-icons/im"
import {BsBrowserEdge} from "react-icons/bs"
import {FiUsers} from "react-icons/fi"
import {GoSignOut} from "react-icons/go"
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { ThunkDispatch } from '@reduxjs/toolkit'
import { removeState } from '../pages/Login/currentUser.slice'

const SideDrawer = () => {

  const [open, setOpen] = useState(false);

  const navigate = useNavigate()

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

          const dispatch = useDispatch<ThunkDispatch<any, any, any>>();


      const handleSignOut =()=>{
        localStorage.removeItem("amryttUserToken");
        dispatch(removeState())
        navigate('/login')
    }

  
  return (
    <div>
     <Button type="primary" onClick={showDrawer} className={styles.drawerButton}>
        <ImMenu/>
      </Button>

      <Drawer width={200} title="Menu" placement="left" onClose={onClose} open={open}>
        <div className={styles.menuButtonContainer}>
          <div className={styles.menuButton}
            onClick={()=>{
              navigate('/')
            }}
          >
            <FiUsers/>
            <div>Users</div>
          </div>
          <div className={styles.menuButton}
            onClick={()=>{
              navigate('/websites')
            }}
          >
            <BsBrowserEdge/>
            <div>Websites</div>
          </div>

          <div className={styles.menuButton}
            onClick={()=>{
              handleSignOut()
            }}
          >
            <GoSignOut/>
            <div>Sign Out</div>
          </div>
        </div>
      </Drawer>
      </div>
  )
}

export default SideDrawer