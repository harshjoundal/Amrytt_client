import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addWebsite, getAllWebsites } from "./websites.api";
import { openNotificationWithIcon } from "../Users/Users";
import axios from "axios";

const initialState = {
    websites : [],
    getAllLoadding : false,
    addWebsiteLoading : false
}

export const getAllWebsite = createAsyncThunk(
    "website/getAllWebsites",
    async ()=>{
        return await getAllWebsites()
    }
)

export const addwebsite = createAsyncThunk (
    "website/addwebsite",
    async (data:any) =>{
        return await addWebsite(data)
    }
)

export const websiteSlice = createSlice({
    name:"website",
    initialState,
    reducers :{

    },
    extraReducers:builder => {
        builder
        .addCase(getAllWebsite.pending,(state)=>{
            state.getAllLoadding = true
            openNotificationWithIcon({type:"info",context:"Fetching website data"})
        })
        .addCase(getAllWebsite.fulfilled,(state,action:any)=>{
            state.getAllLoadding = false    
            state.websites = action.payload.data
        })
        .addCase(getAllWebsite.rejected,(state)=>{
            state.getAllLoadding = false
            openNotificationWithIcon({type:"error",context:"Something went wrong!"})
        })
        .addCase(addwebsite.pending,(state)=>{
            state.addWebsiteLoading = true
        })
        .addCase(addwebsite.fulfilled,(state,action)=>{
            state.addWebsiteLoading = false

            if(action.payload.data.code){
                openNotificationWithIcon({type:"error",context:action.payload.data.code})
                return;
            }
            openNotificationWithIcon({type:"success",context:"Website added successfully"})
            window.location.reload()
        })
        .addCase(addwebsite.rejected,(state)=>{
            state.addWebsiteLoading = false

            openNotificationWithIcon({type:"error",context:"Something went wrong!"})
        })
    }
})

export const selectWebsites = (state:any) => state.website
export default websiteSlice.reducer