import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { fetchListSave } from "./action";
const listSaveSlice = createSlice({
    name: "listSave",
    initialState: {
        list: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: {
        [fetchListSave.pending]: (state) => {
            state.loading = true;
        },
        [fetchListSave.fulfilled]: (state, action) => {
            state.loading = false;
            state.error = null;
            state.list = action.payload;
        },
        [fetchListSave.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        },
    },
});




export default listSaveSlice.reducer;