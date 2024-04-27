import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    error:null,
    loading:false
}

const workflowSlice = createSlice({
    name:"workflow",
    initialState,
    reducers:{
        workflowSaveStart : (state) => {
            state.loading = true
            state.error = null
        },
        workflowSaveSuccess: (state, action) =>  {
            state.loading = false,
            state.error = null  
        },
        workflowSaveFailure: (state, action) => {
            state.error = action.payload
            state.loading = false
        }
    }
})

export const { workflowSaveStart, workflowSaveSuccess, workflowSaveFailure } = workflowSlice.actions
export default workflowSlice.reducer