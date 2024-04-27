import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error:null,
    loading:false
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        signInStart : (state) => {
            state.loading = true
            state.error = null
        },
        signInSuccess: (state, action) =>  {
            state.currentUser = action.payload
            state.loading = false,
            state.error = null  
        },
        signInFailure: (state, action) => {
            state.error = action.payload
            state.loading = false
        },
        signoutSuccess:(state) => {
            state.currentUser = null,
            state.loading = null,
            state.error = null
        }
    }
})

export const { signInStart,signInSuccess,signInFailure,signoutSuccess } = userSlice.actions
export default userSlice.reducer