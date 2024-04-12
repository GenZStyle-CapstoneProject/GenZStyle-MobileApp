import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../services/axiosClient";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetchLikePost = createAsyncThunk(
  "likePost/fetchLikePost",
  async ({ postId }) => {
    const isAuthenticated = Boolean(await AsyncStorage.getItem("ACCESS_TOKEN"));
    if (isAuthenticated) {
      try {
        const apiUrl = `/odata/Like(${postId})`;
        console.log("API URL: ", apiUrl);

        const response = await axiosClient.get(apiUrl);

        console.log("Like post successfully:", response.data);
        return response.data;
      } catch (error) {
        console.error("Error:", error);
        throw error;
      }
    } else {
      Alert.alert("Thông báo", "Vui lòng đăng nhập để tương tác!");
      return false;
    }
  }
);

export const fetchNumberLikeOfPost = createAsyncThunk(
  "likePost/fetchNumberLikeOfPost",
  async ({ postId }) => {
    try {
      const apiUrl = `/odata/Likes/GetAllAccountByLike/${postId}`;
      // console.log("API URL: ", apiUrl);
      const response = await axiosClient.get(apiUrl);
      // console.log("get number like of post successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }
);
