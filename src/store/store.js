import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/authSlice"
import lotReducer from  "../store/lotSlice"
import bidReducer from "../store/bidSlice"

export const store = configureStore({
    reducer:{
        auth: authReducer,
        lot: lotReducer,
        bid: bidReducer,
    }
})

export default store