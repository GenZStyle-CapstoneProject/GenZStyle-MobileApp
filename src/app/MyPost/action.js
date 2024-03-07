import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "./../../../env";

export const fetchMyPost = createAsyncThunk(
    "MyPost/fetchMyPost",
    async (accountId) => {
        try {
            const apiUrl = `${BASE_URL}odata/Posts/${accountId}/GetPostByAccountId`;
            const response = await axios.get(apiUrl);
            console.log("apiUrl", apiUrl);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);
