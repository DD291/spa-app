import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    userName : "u",
    password : "",
    token:""
    }
    
    const authSlice = createSlice({
        name:"auth",
        initialState,
        reducers :{
            loginSuccess:(state, action)=>{
                state.userName=action.payload.userName;
                state.password=action.payload.password;
                state.token=action.payload.token;
                return state
            },
            logoutSuccess:(state)=>{
                state = initialState ;
                return state
            }
        }
    });
    export const {loginSuccess, logoutSuccess} =authSlice.actions;
    export default authSlice.reducer;