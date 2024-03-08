import { createAsyncThunk } from "@reduxjs/toolkit";
import { accountService } from "../../services/accountService";

export const getAccountWithPostList = createAsyncThunk(
  "account/getAccountWithPostList",
  async (username, { rejectWithValue }) => {
    try {
      const response = await accountService.getAccountWithPostList(username);
      return response.data?.accounts;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);
export const resetAccountWithPostList = createAsyncThunk(
  "account/resetAccountWithPostList",
  async (_, { rejectWithValue }) => {
    try {
      return [];
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);
