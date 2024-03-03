import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "./../../../env";

export const fecthListFollow = createAsyncThunk(
    "listfollow/fecthListFollow",
    async () => {
        try {
            const apiUrl = `${BASE_URL}api/Users/ActiveProducts/odata/UserProfile/Follow`;
            const accessToken = await AsyncStorage.getItem("ACCESS_TOKEN");
            console.log('aaaaa', apiUrl);
            const headers = {
                Authorization: `Bearer ${accessToken}`,
            };


            const response = await axios.get(apiUrl, { headers });

            console.log("Respone data", response.data);
            return response.data;

        } catch (error) {
            console.error("Error in :", error);
            throw error;
        }
    }
);
