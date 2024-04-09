import { Platform } from "react-native";
import { io } from "socket.io-client";
import { CHAT_BASE_URL } from "../../env";

let baseUrl = "";
if (__DEV__) {
  baseUrl = CHAT_BASE_URL;
} else {
  baseUrl = CHAT_BASE_URL;
}

export const socket = io.connect(baseUrl);
