import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "./../../../env";

const getAuthToken = async () => {
  try {
    const token = await AsyncStorage.getItem("ACCESS_TOKEN");
    return token;
  } catch (error) {
    console.error("Error getting authentication token:", error);
    throw error;
  }
};

export const fetchAddCommentPost = createAsyncThunk(
  "addCommentPost/fetchAddCommentPost",
  async ({ postId, createAt, content }, { getState }) => {
    try {
      const apiUrl = `${BASE_URL}odata/Comments/${postId}`;
      console.log("API URL: ", apiUrl);
      const authToken = await getAuthToken();

      const response = await axios.post(
        apiUrl,
        {
          createAt,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type":
              "application/json;odata.metadata=minimal;odata.streaming=true",
          },
        }
      );

      console.log("Response data comment", response.data);
      return response.data;
    } catch (error) {
      console.error("Error in addcommentPost :", error);
      throw error;
    }
  }
);
