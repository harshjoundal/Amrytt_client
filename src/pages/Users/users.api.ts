import axios from 'axios'
import { config } from '../../config/config'

let token:any = localStorage.getItem("amryttUserToken")
token= JSON.parse(token);    

export const registerUser = async (data:any)=>{


    try {
        let res = await axios.post(`${config.backEndUrl}/users/register`,data,{
            headers:{
                Authorization : token?.token
            }
        })
        return res
    } catch (error) {
        return error
    }   
}

export const getAllUsers = async ()=>{
    try {
        let res = await axios.get(`${config.backEndUrl}/users/getAll`,{
            headers:{
                Authorization : token?.token
            }
        })
        
        return res.data.user
    } catch (error) {
        
    }
}
export const deleteUser = async (data:any)=>{
    try {
        let res = await axios.post(`${config.backEndUrl}/users/deleteUser`,data,{
            headers:{
                Authorization : token?.token
            }
        })
        return res.data
    } catch (error) {
        return error
    }
}
export const UpdateUser = async (data:any)=>{
    try {
        let res = await axios.post(`${config.backEndUrl}/users/userUpdate`,data,{
            headers:{
                Authorization : token?.token
            }
        })
        return res.data
    } catch (error) {
        return error
    }
}