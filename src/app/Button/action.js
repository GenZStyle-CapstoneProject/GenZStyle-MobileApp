import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "./../../../env";

export const fetchFollowFriend = createAsyncThunk(
    "followFriend/fetchFollowFriend",
    async (userId, { getState }) => {
        try {

            const currentUserId = userId || getState().user.userId;

            const apiUrl = `${BASE_URL}odata/Users/Follower`;
            console.log("API URL: ", apiUrl);


            const requestBody = {
                userId: currentUserId,

            };

            const response = await axios.post(apiUrl, requestBody);
            console.log("Response data", response.data);

            return response.data;
        } catch (error) {
            throw error;
        }
    }
);
