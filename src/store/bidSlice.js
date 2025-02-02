import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    bids: [],
    loading: false,
    error: null,
    bidStatus:[],
    winnerStatus:[],
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
        },
        setBidStatus: (state, action) => {
            const { lotId, status } = action.payload;
            state.bidStatus.push({lotId, status})  // Set bid status (e.g., "outbid", "win", "lose")
            console.log("from bidslice:",action.payload)
        },
        clearBidStatus: (state) => {
            state.bidStatus = [];  // Clear bid status
        },
        setWinnerStatus: (state, action) => {
            const { lotId, status } = action.payload;
            state.winnerStatus.push({ lotId, status });  // Set winner status (e.g., "won", "lost")
        },
        clearWinnerStatus: (state) => {
            state.winnerStatus = [];  // Clear winner status
        },
    }
});

export const {
    fetchBidsStart,
    fetchBidsSuccess,
    fetchBidsFailure,
    addBid,
    removeBid,
    setBidStatus,
    clearBidStatus,
    setWinnerStatus,
    clearWinnerStatus

} = bidSlice.actions;

export default bidSlice.reducer;
