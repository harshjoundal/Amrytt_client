import axios from "axios";
import { config } from "../../config/config";

let token:any = localStorage.getItem("amryttUserToken")
token= JSON.parse(token); 


export const getAllWebsites = async ()=>{
    try {
        let res = await axios.get(`${config.backEndUrl}/websites/getAll`,{
            headers:{
                Authorization : token?.token
            }
        })        
        return res.data

    } catch (error) {
        
    }
}

export const addWebsite = async (data:any)=>{
    try {
        let res = await axios.post(`${config.backEndUrl}/websites/addWebsite`,data,{
            headers:{
                Authorization : token?.token
            }
        })        
        return res.data

    } catch (error) {
        
    }
}