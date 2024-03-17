import { createSlice } from "@reduxjs/toolkit";
import {
  followOneAccount,
  getAccountWithPostList,
  getFollowingAccountWithPosts,
  getSuggestionAccount,
  getSuggestionAccountByAccountId,
  resetAccountWithPostList,
} from "./actions";

const accountSlice = createSlice({
  name: "account",
  initialState: {
    accountResponse: null,
    accountList: [],
    accountSuggestionList: [],
    accountSuggestion: null,
    accountFollowingList: [],
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
      .addCase(resetAccountWithPostList.pending, (state) => {})
      .addCase(resetAccountWithPostList.fulfilled, (state, action) => {
        state.accountList = action.payload;
      })
      .addCase(resetAccountWithPostList.rejected, (state, action) => {})
      // NGăn cách
      .addCase(getSuggestionAccount.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSuggestionAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.accountSuggestionList = action.payload;
      })
      .addCase(getSuggestionAccount.rejected, (state, action) => {
        state.loading = false;
      })
      // NGăn cách
      .addCase(followOneAccount.pending, (state) => {
        state.loading = true;
      })
      .addCase(followOneAccount.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(followOneAccount.rejected, (state, action) => {
        state.loading = false;
      })
      // NGăn cách
      .addCase(getSuggestionAccountByAccountId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSuggestionAccountByAccountId.fulfilled, (state, action) => {
        state.accountSuggestion = action.payload;
        state.loading = false;
      })
      .addCase(getSuggestionAccountByAccountId.rejected, (state, action) => {
        state.loading = false;
      })
      // NGăn cách
      .addCase(getFollowingAccountWithPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFollowingAccountWithPosts.fulfilled, (state, action) => {
        state.accountFollowingList = action.payload;
        state.loading = false;
      })
      .addCase(getFollowingAccountWithPosts.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default accountSlice.reducer;
