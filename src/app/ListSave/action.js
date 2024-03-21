import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../services/axiosClient";

export const fecthListSave = createAsyncThunk(
    "listSave/fetchlistSave",
    async () => {
        try {
            const apiUrl = `/odata/Collections/Active/GetAllColletion`;
            const response = await axiosClient.get(apiUrl);
            console.log("Respone data", response.data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);