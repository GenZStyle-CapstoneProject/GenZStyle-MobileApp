import React, { useEffect, useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { View } from "react-native";
import NotiTab from "../components/Noti/NotiTab";
import { Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

WebBrowser.maybeCompleteAuthSession();
const Tab = createMaterialTopTabNavigator();

const NotificationScreen = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "904403290668-b0cd8vmtasp2d2pqe0k64s41rkssl2r3.apps.googleusercontent.com",
    webClientId:
      "904403290668-ignc5s8guh4aq4ih4bqphglajjkprtqc.apps.googleusercontent.com",
    scopes: ["profile", "email"],
    
  });

  useEffect(() => {
    handle();
  }, [response]);

  const handle = async () => {
    const user = await AsyncStorage.getItem("@user");
    if (!user) {
      if (response?.type === "success")
        console.log(
          JSON.stringify(response.authentication?.accessToken, null, 2)
        );
      await getUserInfo(response.authentication?.accessToken);
    } else {
      setUserInfo(JSON.parse(user));
    }
  };

  const getUserInfo = async (token) => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const user = await response.json();
      console.log(JSON.stringify(user, null, 2));
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user ?? null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <NotiTab />
      <Button onPress={() => promptAsync()}>Login Google</Button>
      <Button onPress={() => AsyncStorage.removeItem("@user")}>Logout</Button>
    </View>
  );
};

export default NotificationScreen;
