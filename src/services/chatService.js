import { Platform } from "react-native";
import { io } from "socket.io-client";
import { CHAT_BASE_URL } from "../../env";

let baseUrl = "";
if (__DEV__) {
  // baseUrl =
  //   Platform.OS === "android"
  //     ? "http://192.168.2.7:4000"
  //     : "http://localhost:4000";
  baseUrl = CHAT_BASE_URL;
} else {
  baseUrl = CHAT_BASE_URL;
}

// const baseUrl =
//   Platform.OS === "android"
//     ? "http://192.168.1.112:4000"
//     : "http://localhost:4000";

export const socket = io.connect(baseUrl);
