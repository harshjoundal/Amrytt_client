import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UpdateUser, deleteUser, getAllUsers, registerUser } from "./users.api";
import { openNotificationWithIcon } from "./Users";
import {message} from "antd"

const initialState = {
    users : [],
    registerUserLoading:false,
    getAllLoading : false,
    userDeleteLoading : false
}

export const getall = createAsyncThunk(
    "users/getall",
    async () =>{
        return await getAllUsers()
    }
)


export const addUser = createAsyncThunk(
    "users/adduser",
    async (data:any) =>{
        return await registerUser(data)
    }
)

export const DeleteUser = createAsyncThunk(
    "users/DeleteUser",
    async (data:any)=>{
        return await deleteUser(data);
    }
)
export const updateUser = createAsyncThunk(
    "users/updateUser",
    async (data:any)=>{
        return await UpdateUser({...data,password:undefined});
    }
)



export const usersSlice = createSlice({
    name :"users",
    initialState,
    reducers:{

    },
    extraReducers:builder =>{
        builder
        .addCase(addUser.pending,(state)=>{
            state.registerUserLoading = true;
        })
        .addCase(addUser.fulfilled,(state,action:any)=>{
            state.registerUserLoading = false;
            message.success("User Added successfully!")
            window.location.reload()
            
        })
        .addCase(addUser.rejected,(state)=>{
            state.registerUserLoading = false;
            message.error("Not able to add user!")
        })
        .addCase(getall.pending,(state)=>{
            state.getAllLoading = true;
        })
        .addCase(getall.fulfilled,(state,action:any)=>{
            state.getAllLoading = false;
            state.users = action.payload
        })
        .addCase(getall.rejected,(state)=>{
            state.getAllLoading = false;
        })
        .addCase(DeleteUser.pending,(state)=>{
            state.userDeleteLoading = true;
        })
        .addCase(DeleteUser.fulfilled,(state)=>{
            state.userDeleteLoading = false;
            message.success("User Deleted successfully!")
            window.location.reload()
            
        })
        .addCase(DeleteUser.rejected,(state)=>{
            state.userDeleteLoading = false;
            message.error("Somethig Wrong!")
        })
        .addCase(updateUser.pending,(state)=>{
        })
        .addCase(updateUser.fulfilled,(state)=>{
            message.success("User Updated successfully!")
            window.location.reload()
        })
        .addCase(updateUser.rejected,(state)=>{
            message.success("Something went wrong!")
        })

    }
})

export const selectUsersState = (state:any)=>state.users
export default usersSlice.reducer