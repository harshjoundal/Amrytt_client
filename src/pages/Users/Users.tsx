import { Button,Modal,Radio,Spin,Table,Space,message} from 'antd'
import React, { useEffect, useState } from 'react'
import styles from './users.module.css'
import {useForm} from "react-hook-form"
import { useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch } from '@reduxjs/toolkit'
import { addUser, getall, selectUsersState ,DeleteUser} from './user.slice'
import { selectCurrentUser } from '../Login/currentUser.slice'
import EditUserModal from '../../components/editUserModal'
import { useNavigate } from 'react-router-dom'
var _ = require('lodash')

export const openNotificationWithIcon = ({ type, context }:any) => {
    if (type === "success") { message.success(context); }
    if (type === "info") { message.info(context); }
    if (type === "warning") { message.warning(context); }
    if (type === "error") { message.error(context); }
};

const { Column, ColumnGroup } = Table; 

const Users = () => {
    const [openModal , setModal] = useState(false)
    const [editModal , setEditmodal] = useState(false)

    const navigate = useNavigate()

    const [selectedUser,setSelectedUser] = useState<any>({})

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

    const {user} = useSelector(selectCurrentUser)
    const {users} = useSelector(selectUsersState)

    const { register, handleSubmit } = useForm();



    useEffect(()=>{
        dispatch(getall())
    },[])


    const deleteUser = async (data:any)=>{
        dispatch(DeleteUser(data))
        dispatch(getall())
    }
    
    const adduser =(data:any)=>{

        let reqData = {
            name : data?.name,
            email:data?.email,
            password:data?.password,
            role:data?.role,
            permission:{
                USER :{
                    read :data?.userPermission?.read,
                    write :data?.userPermission?.write,
                    delete :data?.userPermission?.delete
                },
                WEBSITE:{
                    read :data?.websitePermission?.read,
                    write :data?.websitePermission?.write,
                    delete :data?.websitePermission?.delete
                }
            }

        }
        dispatch(addUser(reqData))
        dispatch(getall())
    }


    
    if(_.isEmpty(user)){
        // message.warning("You need to login first!")
        navigate('/login')
    }
  return (
    <div>

        {user.role === "ADMIN"
            && (
                <button
                     onClick={()=>setModal(true)}
                     className={styles.adduserButton}
                >Add user</button>
            )
        }

        <Modal
        title="Add User"
        open={openModal}
        onOk={()=>setModal(false)}
        // confirmLoading={confirmLoading}
        onCancel={()=>setModal(false)}
        cancelButtonProps={{hidden:true}}
        okText={"Add User"}
        footer={false}
        width={"50%"}
        >

            <div className={styles.formContainer}>
                <form onSubmit={handleSubmit((data) => adduser(data))} className={styles.userform}>

                    <input {...register("name")} placeholder="Name"/>

                    <div className={styles.roleContainer}>
                        <label>Role</label>
                        <select {...register("role", { required: true })}>
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

                                    <select {...register("userPermission.read", { required: true })}>
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

                    <input placeholder='Email' type='email' {...register("email")}/>
                    <input placeholder='Password' type='password' {...register("password")}/>

                    <button type='submit' className={styles.formSubmit}>Add User</button>
                </form>
            </div>

        </Modal>

        <div className={styles.tableContainer}>
            <Table dataSource={users} bordered={true}>
                <Column title="Name" dataIndex="name" key="name" />
                <Column title="Email" dataIndex="email" key="email" />
                <Column title="Role" dataIndex="role" key="role" />
                <ColumnGroup title="Permissions">
                    <ColumnGroup title="User Permissions">
                        <Column title="Read" dataIndex= "permission" key="Uread" render={({USER})=>(
                            <div>{String(USER.read)}</div>
                        )} />
                        <Column title="Write" dataIndex= "permission" key="Uwrite" render={({USER})=>(
                            <div>{String(USER.write)}</div>
                        )} />
                        <Column title="Delete" dataIndex= "permission" key="Udelete" render={({USER})=>(
                            <div>{String(USER.delete)}</div>
                        )} />

                    </ColumnGroup>

                    <ColumnGroup title="Website Permissions">
                        <Column title="Read" dataIndex= "permission" key="Wread" render={({WEBSITE})=>(
                            <div>{String(WEBSITE.read)}</div>
                        )} />
                        <Column title="Write" dataIndex= "permission" key="Wwrite" render={({WEBSITE})=>(
                            <div>{String(WEBSITE.write)}</div>
                        )} />
                        <Column title="Delete" dataIndex= "permission" key="Wdelete" render={({WEBSITE})=>(
                            <div>{String(WEBSITE.delete)}</div>
                        )} />
                    </ColumnGroup>
                </ColumnGroup>
                <Column
                    title="Action"
                    key="action"
                    render={(_: any, record:any) => {
                        
                        return (
                        <Space size="middle">
                        <Button disabled={(()=>{
                            if(user?.role ==="ADMIN"){
                                return false
                            }
                            else if(user?.permission?.USER?.write =="true"){
                                return false
                            }
                            else{
                                return true
                            }
                        })()} onClick={()=>{
                            setSelectedUser(record);
                            setEditmodal(true)
                        }}>Edit {record.lastName}</Button>
                        <Button disabled={(()=>{
                            if(user?.role ==="ADMIN"){
                                return false
                            }
                            else if(user?.permission?.USER?.delete =="true"){
                                return false
                            }
                            else{
                                return true
                            }
                        })()} onClick={()=>{
                            deleteUser(record)
                        }} style={{background:"red",color:"#fff"}}>Delete</Button>
                        </Space>
                        )
                    }}
                />
            </Table>
        </div>


        <Modal
            title="Edit User"
            open={editModal}
            onCancel={()=>setEditmodal(false)}
            okText={"Add User"}
            footer={false}
            width={"50%"}
        >
            <>
                <EditUserModal userData={selectedUser}/>
            </>

        </Modal>
        
    </div>
  )
}

export default Users