import { Platform } from "react-native";

export const BASE_URL = "https://genzstyleapp.azurewebsites.net";
// export const CHAT_BASE_URL = "https://genz-chatapp-be.up.railway.app";
export const CHAT_BASE_URL =
  Platform.OS === "android"
    ? "http://192.168.2.7:4000"
    : "http://localhost:4000";
