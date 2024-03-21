import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../services/axiosClient";

export const savePost = createAsyncThunk(
    "save/savePost",
    async (postId) => {
        try {
            const apiUrl = `/odata/Posts/${postId}/SaveCollectionByPostId`;
            const response = await axiosClient.post(apiUrl);
            return postId; // Trả về postId đã lưu
        } catch (error) {
            throw error;
        }
    }
);

export const unsavePost = createAsyncThunk(
    "save/unsavePost",
    async (postId) => {
        try {
            const apiUrl = `/odata/Posts/${postId}/UnsaveCollectionByPostId`; // Thay đổi API endpoint tương ứng
            const response = await axiosClient.post(apiUrl);
            return postId; // Trả về postId đã hủy lưu
        } catch (error) {
            throw error;
        }
    }
);
