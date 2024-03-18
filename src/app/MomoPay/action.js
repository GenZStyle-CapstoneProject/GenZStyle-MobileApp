import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Linking } from "react-native";
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

export const fetchMomoPay = createAsyncThunk(
  "payment/fetchMomoPay",
  async ({ email, type, amount }, { getState }) => {
    try {
      const apiUrl = `${BASE_URL}/odata/WalletTransactions/CreateMomoTransaction?PackageId=${type}`;
      console.log("API URL: ", apiUrl);
      //   const authToken = await getAuthToken();

      const response = await axios.post(apiUrl, {
        email: email,
        amount: amount,
        redirectUrl: "https://momo.vn",
      });
      console.log("Response data payment ss", response);
      console.log("Response data payment", response.data.payUrl);

      Linking.openURL(response.data.payUrl);
      return response.data;
    } catch (error) {
      console.error("Error in payment :", error);
      throw error;
    }
  }
);
