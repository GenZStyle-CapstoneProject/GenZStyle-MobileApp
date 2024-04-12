import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../services/axiosClient";

export const reportUser = createAsyncThunk(
    "User/reportUser",
    async ({ reporterId, description }) => {
        try {
            const apiUrl = `/odata/Report/AddNewReportByReporter`;
            const formData = new FormData();
            formData.append('ReporterId', reporterId);
            formData.append('ReportName', 'Tố cáo người dùng');
            formData.append('Description', description);

            console.log(formData);

            const response = await axiosClient.post(apiUrl, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            return response.data;
        } catch (error) {
            throw error;
        }
    }
);
