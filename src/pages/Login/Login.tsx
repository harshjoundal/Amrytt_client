import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Loginuser, selectCurrentUser, setState } from './currentUser.slice'
import styles from './Login.module.css'
import loginImage from './loginImage.png'
import {ThunkDispatch} from "@reduxjs/toolkit";
import { useNavigate } from 'react-router-dom'
import _ from 'lodash'
import Loader from '../../components/Loader'




const Login = () => {
    
    const [formState,setFormState] = useState({email:"",password:""})

    const navigate = useNavigate()
    const {user,loginLoading} = useSelector(selectCurrentUser)

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    
    useEffect(()=>{
            let localUser:any = localStorage.getItem("amryttUserToken")
            localUser = JSON.parse(localUser)
            if(!_.isEmpty(localUser?.user)){
                dispatch(setState(localUser.user))
            }
    })
    
    const handleSubmit = async ()=>{
        dispatch(Loginuser(formState))
    }

    if(!_.isEmpty(user)){
        navigate('/')
    }
  return (
    <div className={styles.mainContainer}>
        {loginLoading && <Loader message='Loading...'/>}
        <div className={styles.loginLeft}>
            <div className={styles.loginFormContainer}>
                <div className={styles.loginTitle}>Login</div>
                <p style={{color:"white",fontSize:"12px",fontFamily:'sans-serif',marginBottom:"2rem"}}>Enter your account details</p>


                <form onSubmit={(e)=>{
                    e.preventDefault()
                    handleSubmit()
                }} className={styles.loginForm}>
                    <input placeholder='Email' type='email' required={true}
                        value={formState.email}
                        onChange={(e)=>{
                            setFormState({...formState,email:e.target.value})
                        }}
                    />
                    <input placeholder='Password' type='password' required={true}
                        value={formState.password}
                        onChange={(e)=>{
                            setFormState({...formState,password:e.target.value})
                        }}
                    />
                    <button type='submit' className={styles.loginButton}>Login</button>
                </form>

            </div>
        </div>
        <div className={styles.loginRight}>
            <div className={styles.leftTitle}>
                <div >Welcome to</div>
                <div >Amrytt</div>
            </div>

            <div className={styles.imageContainer}>
                <img className={styles.LoginImage} src={loginImage} alt=''/>
            </div>
        </div>

    </div>
  )
}

export default Login