import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    loading: false,
    error:null
}

const lotSlice = createSlice({
    name:"lot",
    initialState,
    reducers:{
        fetchItemStart:(state)=>{
            state.loading=true
            state.error=null
        },
        fetchItemSuccess:(state,action)=>{
            state.loading=false
            state.items= action.payload
        },
        fetchItemFailure:(state,action)=>{
            state.loading=false
            state.error=action.payload
        },
        addItem:(state,action)=>{
            state.items.push(action.payload)
        },
        removeItem:(state,action)=>{
            state.items= state.items.filter(item => item.id !== action.payload.id)
        }
    }
})

export const {
    fetchItemStart,
    fetchItemSuccess,
    fetchItemFailure,
    addItem,
    removeItem
} = lotSlice.actions;

export default lotSlice.reducer