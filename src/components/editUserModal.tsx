import React, { useEffect, useState } from 'react'
import styles from './../pages/Users/users.module.css'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { ThunkDispatch } from '@reduxjs/toolkit'
import { updateUser } from '../pages/Users/user.slice'


const EditUserModal = ({userData}:any) => {
    const {register,handleSubmit} = useForm()
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

    const [user,setUser] = useState<any>({})

    useEffect(()=>{
        setUser(userData)
    },[userData])


    const handleEditUser = (data:any)=>{
        dispatch(updateUser(data))   
    }



  return (
    <div>

        <div className={styles.formContainer}>
                <form onSubmit={handleSubmit((data) => 
                    handleEditUser({...user,permission:{
                        USER: {...data.userPermission},
                        WEBSITE: {...data.websitePermission}
                    }}))
                } 
                    className={styles.userform}>

                    <input {...register("name")} onChange={(e)=>{
                        setUser({...user,name :e.target.value})
                    }} value={user?.name} placeholder="Name"/>

                    <div className={styles.roleContainer}>
                        <label>Role</label>
                        <select {...register("role", { required: true })}
                        onChange={(e)=>{
                        setUser({...user,role :e.target.value})}}
                        value={user?.role}>
                            <option value="USER">User</option>
                            <option value="ADMIN">Admin</option>
                        </select>
                    </div>

                    <div style={{display:"flex",justifyContent:"space-around"}}>
                        <div className={styles.permissionContainer}>

                            <div>User Permissions</div>
                            <div className={styles.permissions}>
                                <div>
                                    <div>Read</div>

                                    <select {...register("userPermission.read", { required: true })}
                                    >
                                        <option value="true">True</option>
                                        <option value="false">false</option>
                                    </select>

                                    {/* <Radio.Group {...register("userPermission.read")} defaultValue={true} >
                                        <Radio value={true}>True</Radio>
                                        <Radio value={false}>False</Radio>
                                    </Radio.Group> */}
                                </div>
                                <div>
                                    <div>Write</div>
                                    <select {...register("userPermission.write", { required: true })}>
                                        <option value="true">True</option>
                                        <option value="false">false</option>
                                    </select>


                                    {/* <Radio.Group {...register("userPermission.write")}
                                    defaultValue={true}
                                    >
                                        <Radio value={true}>True</Radio>
                                        <Radio value={false}>False</Radio>
                                    </Radio.Group> */}
                                </div>
                                <div>
                                    <div>Delete</div>
                                    <select {...register("userPermission.delete", { required: true })}>
                                        <option value="true">True</option>
                                        <option value="false">false</option>
                                    </select>
                                    {/* <Radio.Group {...register("userPermission.delete")} 
                                    defaultValue={true}
                                    >
                                        <Radio value={true}>True</Radio>
                                        <Radio value={false}>False</Radio>
                                    </Radio.Group> */}
                                </div>
                            </div>

                        </div>
                        <div className={styles.permissionContainer}>

                                <div>Website Permissions</div>
                            <div className={styles.permissions}>
                                <div>
                                    <div>Read</div>

                                    <select {...register("websitePermission.read", { required: true })}>
                                        <option value="true">True</option>
                                        <option value="false">false</option>
                                    </select>
                                    {/* <Radio.Group {...register("websitePermission.read")} defaultValue={true}>
                                        <Radio value={true}>True</Radio>
                                        <Radio value={false}>False</Radio>
                                    </Radio.Group> */}
                                </div>
                                <div>
                                    <div>Write</div>
                                    <select {...register("websitePermission.write", { required: true })}>
                                        <option value="true">True</option>
                                        <option value="false">false</option>
                                    </select>
                                    {/* <Radio.Group {...register("websitePermission.write")} defaultValue={true}>
                                        <Radio value={true}>True</Radio>
                                        <Radio value={false}>False</Radio>
                                    </Radio.Group> */}
                                </div>
                                <div>
                                    <div>Delete</div>

                                    <select {...register("websitePermission.delete", { required: true })}>
                                        <option value="true">True</option>
                                        <option value="false">false</option>
                                    </select>
                                    {/* <Radio.Group {...register("websitePermission.delete")} defaultValue={true}>
                                        <Radio value={true}>True</Radio>
                                        <Radio value={false}>False</Radio>
                                    </Radio.Group> */}
                                </div>
                            </div>

                        </div>
                    </div>

                    <input placeholder='Email' type='email' {...register("email")} value={user?.email} onChange={(e)=>{
                        setUser({...user,email :e.target.value})
                    }}/>
                    {/* <input placeholder='Password' type='password'{...register("password")}/> */}

                    <button type='submit' className={styles.formSubmit}>Edit User</button>
                </form>
            </div>
    </div>
  )
}

export default EditUserModal