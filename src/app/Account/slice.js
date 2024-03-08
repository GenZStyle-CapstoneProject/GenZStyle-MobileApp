import { createSlice } from "@reduxjs/toolkit";
import { getAccountWithPostList, resetAccountWithPostList } from "./actions";

const accountSlice = createSlice({
  name: "account",
  initialState: {
    accountResponse: null,
    accountList: [],
    loading: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAccountWithPostList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAccountWithPostList.fulfilled, (state, action) => {
        state.loading = false;
        state.accountList = action.payload;
      })
      .addCase(getAccountWithPostList.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(resetAccountWithPostList.pending, (state) => {
      })
      .addCase(resetAccountWithPostList.fulfilled, (state, action) => {
        state.accountList = action.payload;
      })
      .addCase(resetAccountWithPostList.rejected, (state, action) => {
      });
    
  },
});

export default accountSlice.reducer;
