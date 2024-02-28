import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { productService } from "../services/productService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { postService } from "../services/postService";

const initialState = {
  userInfo: null,
  accessToken: "",
  hashtagList: [],

};
export const createnewpost = createAsyncThunk(
  "post/createnewpost",
  async ({ Content, Image, Hashtags }, { rejectWithValue }) => {
    try {
      const response = await postService.createnewpost({ Content, Image, Hashtags });
      console.log("<PostSlice>: " + response?.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data);
    }
  }
);
export const getDetailHashtag = createAsyncThunk(
  "post/getName",
  async (_, { rejectWithValue }) => {
    try {
      const response = await postService.getDetailHashtag();
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createnewpost.pending, (state, action) => {
        state.loading = true;
        state.authenticated = false;
      })
      .addCase(createnewpost.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.loading = false;
        state.authenticated = true;
      })
      .addCase(createnewpost.rejected, (state, action) => {
        state.loading = false;
        state.authenticated = false;
      })
      .addCase(getDetailHashtag.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getDetailHashtag.fulfilled, (state, action) => {
        state.hashtagList = action.payload;
        state.loading = false;
      })
      .addCase(getDetailHashtag.rejected, (state, action) => {
        state.loading = false;
      })
  },
});
export default postSlice.reducer;
