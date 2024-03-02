import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "./../../../env";

export const fetchPurchasePackage = createAsyncThunk(
  "purchasePackage/fetchPurchasePackage",
  async (type) => {
    try {
      const apiUrl = `https://genzstyleappapi20240126141439.azurewebsites.net/odata/Puchare/PurcharePackage?PackageId=${type}`;
      const accessToken = await AsyncStorage.getItem("ACCESS_TOKEN");
      console.log("Token: ", accessToken);
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      console.log("Request URL: ", apiUrl);
      console.log("Request Headers: ", headers);

      const response = await axios.post(apiUrl, null, { headers });

      console.log("Response data", response.data);
      alert("Mua gói thành công");
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }
);
