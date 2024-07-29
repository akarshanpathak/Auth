import { createSlice } from "@reduxjs/toolkit"

const initialState={
    currentUser:{},
    error:null, 
    loading:false
}

const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        signInStart:(state,action)=>{
              state.currentUser=null
              state.error=null
              state.loading=true
        },
        signInFailure:(state,action)=>{
            state.currentUser=null
            state.error=action.payload
            state.loading=false
        },
        signInSuccess:(state,action)=>{
            state.currentUser=action.payload
            state.error=null
            state.loading=false
        },
        signOutSuccess:(state,action)=>{
            state.currentUser=null
            state.error=null
            state.loading=false
        },
        updateSuccess:(state,action)=>{
            state.currentUser=action.payload
            state.error=null
            state.loading=false
        }
    }
})

export const {signInFailure,signInStart,signInSuccess,signOutSuccess,updateSuccess} = userSlice.actions
export default userSlice.reducer
