

import { createSlice } from "@reduxjs/toolkit";
import { addNewReport } from "./action";

const reportSlice = createSlice({
    name: "report",
    initialState: {
        addingReport: "idle",
        errorAddingReport: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addNewReport.pending, (state) => {
                state.addingReport = "pending";
                state.errorAddingReport = null;
            })
            .addCase(addNewReport.fulfilled, (state) => {
                state.addingReport = "fulfilled";
            })
            .addCase(addNewReport.rejected, (state, action) => {
                state.addingReport = "rejected";
                state.errorAddingReport = action.error.message;
            });
    },
});

export default reportSlice.reducer;
