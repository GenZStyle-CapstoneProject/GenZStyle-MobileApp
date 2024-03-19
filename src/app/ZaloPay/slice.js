import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMomoPay } from "./action";

const zaloPaymentSlice = createSlice({
  name: "paymentZalo",
  initialState: {
    dataZaloPay: [],
    loadingZaloPay: "idle",
    errorZaloPay: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMomoPay.pending, (state) => {
        state.loadingZaloPay = "pending";
      })
      .addCase(fetchMomoPay.fulfilled, (state, action) => {
        state.loadingZaloPay = "fulfilled";
        state.dataZaloPay = action.payload;
      })
      .addCase(fetchMomoPay.rejected, (state, action) => {
        state.loadingZaloPay = "rejected";
        state.errorZaloPay = action.error.message;
      });
  },
});

export default zaloPaymentSlice.reducer;
