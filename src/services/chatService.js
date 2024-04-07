import { Platform } from "react-native";
import { io } from "socket.io-client";

let baseUrl = "";
if (__DEV__) {
  baseUrl =
    Platform.OS === "android"
      ? "http://192.168.2.7:4000"
      : "http://localhost:4000";
  // baseUrl =
  //   Platform.OS === "android"
  //     ? "http://192.168.101.12:4000"
  //     : "http://localhost:4000";
  // baseUrl = "https://genz-chatapp-be.up.railway.app";
} else {
  baseUrl = "https://genz-chatapp-be.up.railway.app";
}

// const baseUrl =
//   Platform.OS === "android"
//     ? "http://192.168.1.112:4000"
//     : "http://localhost:4000";

export const socket = io.connect(baseUrl);
