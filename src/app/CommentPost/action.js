import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "./../../../env";

export const fetchCommentPost = createAsyncThunk(
  "commentPost/fetchCommentPost",
  async (postId) => {
    try {
      console.log("Post id", postId);
      const apiUrl = `${BASE_URL}odata/Comments/${postId}`;
      console.log("API URL: ", apiUrl);
      const response = await axios.get(apiUrl);
      console.log("Respone data", response.data);
      return response.data;
    } catch (error) {
      console.error("Error in commentPost :", error);
      throw error;
    }
  }
);
