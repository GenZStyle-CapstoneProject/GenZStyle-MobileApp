
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../services/axiosClient";

export const addNewReport = createAsyncThunk(
    "Report/addNewReport",
    async ({ postId, description }) => {
        try {
            const apiUrl = `/odata/Report/AddNewReport`;
            const formData = new FormData();
            formData.append('PostId', postId);
            formData.append('ReportName', 'Tố cáo bài viết');
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
