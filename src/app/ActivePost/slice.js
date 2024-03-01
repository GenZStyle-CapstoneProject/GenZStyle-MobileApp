import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { fecthActivePost } from "./action";

const activePostSlice = createSlice({
  name: "activePost",
  initialState: {
    dataActivePost: [],
    loadingActivePost: "idle",
    errorActivePost: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fecthActivePost.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fecthActivePost.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.data = action.payload;
      })
      .addCase(fecthActivePost.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.error.message;
      });
  },
});

export default activePostSlice.reducer;
