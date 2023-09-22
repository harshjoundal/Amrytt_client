import { combineReducers, configureStore } from "@reduxjs/toolkit";
import currentUserReducer from './../pages/Login/currentUser.slice'
import UsersReducer from './../pages/Users/user.slice'
import WebsiteReducer from './../pages/Websites/websites.slice'


const reducers = combineReducers({
    currentUser : currentUserReducer,
    users : UsersReducer,
    website:WebsiteReducer
})

export type AppDispatch = typeof store.dispatch;
export const store = configureStore({
    reducer : reducers
})