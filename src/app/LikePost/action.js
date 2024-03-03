import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "./../../../env";

const getAccessToken = async () => {
  try {
    const token = await AsyncStorage.getItem("ACCESS_TOKEN");
    return token;
  } catch (error) {
    console.error("Error getting access token:", error);
    throw error;
  }
};
export const fetchLikePost = createAsyncThunk(
  "likePost/fetchLikePost",
  async ({ postId }) => {
    try {
      const apiUrl = `${BASE_URL}odata/Like(${postId})`;
      console.log("API URL: ", apiUrl);
      const accessToken = await getAccessToken();
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await axios.get(apiUrl, { headers });
      console.log("Like post successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  } 
);

export const fetchNumberLikeOfPost = createAsyncThunk(
  "likePost/fetchNumberLikeOfPost",
  async ({ postId }) => {
    try {
      const apiUrl = `${BASE_URL}odata/Likes/GetAllAccountByLike/${postId}`;
      console.log("API URL: ", apiUrl);
      const accessToken = await getAccessToken();
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await axios.get(apiUrl, { headers });
      console.log("get number like of post successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }
);
