import { configureStore } from "@reduxjs/toolkit";
import authReducer from './reducers/authSlice';
import usersReducer from './reducers/userSlice'

const store = configureStore({
    reducer:{
        auth:authReducer,
        users:usersReducer
    }
})

export default store