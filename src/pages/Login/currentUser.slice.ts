import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { loginUser } from "./login.api"
import { message } from "antd"


const initialState = {
    user :{},
    isLoggedIn:false,
    loginLoading : false
}

export const Loginuser = createAsyncThunk(
    "currentUser/login",
    async (data : {email:string,password:string})=>{
        return await loginUser(data)
    }
)

export const currentUserSlice = createSlice({
    name :"currentUser",
    initialState,
    reducers :{
        setState : (state,action:any) =>{
            state.user = action.payload
        },
        removeState : (state) =>{
            state.user = {}
        }
    },
    extraReducers:builder =>{
        builder

        .addCase(Loginuser.pending,(state)=>{
            state.loginLoading = true;
            message.info("Logging In")
            return
        })
        .addCase(Loginuser.fulfilled,(state,action:any)=>{
            if(action.payload.success == false){
                message.error(action.payload.message)
                return;
            }
            state.user = action?.payload?.user;
            state.loginLoading=false;
            state.isLoggedIn = true
            message.success("Login Successful!")
            localStorage.setItem("amryttUserToken",JSON.stringify({token : action?.payload?.token,user:action?.payload?.user}))
        })
        .addCase(Loginuser.rejected,(state,action:any)=>{
            state.loginLoading=false;
            state.isLoggedIn = false
        })
    }
})


export const selectCurrentUser = (state:any) => state.currentUser
export const {setState,removeState} = currentUserSlice.actions
export default currentUserSlice.reducer

