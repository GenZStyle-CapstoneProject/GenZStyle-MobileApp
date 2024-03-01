import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "./../../../env";

export const fecthActivePost = createAsyncThunk(
  "activePost/fetchActivePost",
  async () => {
    try {
      const apiUrl = `${BASE_URL}/odata/Posts/Active/Post`;
      const response = await axios.get(apiUrl);
      console.log("Respone data", response.data);
      return response.data;
    } catch (error) {
      console.error("Error in :", error);
      throw error;
    }
  }
);
