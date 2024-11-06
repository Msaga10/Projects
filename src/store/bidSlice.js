import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    bids: [],
    loading: false,
    error: null,
};

const bidSlice = createSlice({
    name: "bid",
    initialState,
    reducers: {
        fetchBidsStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchBidsSuccess: (state, action) => {
            state.loading = false;
            state.bids = action.payload;
        },
        fetchBidsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        addBid: (state, action) => {
            console.log("Adding bid:", action.payload);
            state.bids.push(action.payload);
        },
        removeBid: (state, action) => {
            state.bids = state.bids.filter(bid => bid.id !== action.payload.id);
        }
    }
});

export const {
    fetchBidsStart,
    fetchBidsSuccess,
    fetchBidsFailure,
    addBid,
    removeBid
} = bidSlice.actions;

export default bidSlice.reducer;
