import { createSlice } from "@reduxjs/toolkit";
import { reportUser } from "./action";

const reportUserSlice = createSlice({
    name: "reportUser",
    initialState: {
        addingReportUser: "idle",
        errorAddingReportUser: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(reportUser.pending, (state) => {
                state.addingReportUser = "pending";
                state.errorAddingReportUser = null;
            })
            .addCase(reportUser.fulfilled, (state) => {
                state.addingReportUser = "fulfilled";
            })
            .addCase(reportUser.rejected, (state, action) => {
                state.addingReportUser = "rejected";
                state.errorAddingReportUser = action.error.message;
            });
    },
});

export default reportUserSlice.reducer;
