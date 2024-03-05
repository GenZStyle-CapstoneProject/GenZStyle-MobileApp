import {
    View,
    Text,
    Pressable,
    Image,
    Linking,
    TouchableOpacity,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import { LinearGradient } from "expo-linear-gradient";
  import COLORS from "../constants/colors";
  import { Ionicons } from "@expo/vector-icons";
  import * as Google from "expo-auth-session/providers/google";
  import ROUTES from "../constants/routes";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import { useAppDispatch } from "../app/hooks";
  import { setExitIntro } from "../features/userSlice";
  const WelcomeBack = ({ navigation }) => {
    const dispatch = useAppDispatch();
    // const [request, response, promptAsync] = Google.useAuthRequest({
    //     androidClientId: '480442253942-kn791oae3hf8jfgue8v7hmqeja6i3ct1.apps.googleusercontent.com',
    //     scopes: ['profile', 'email'],
    // });
  
    const handleGoogleLogin = async () => {
      // console.log('Google Sign In Result:', result);
      // try {
      //     console.log('Google Sign In Result:', result);
      //     await promptAsync();
      // } catch (e) {
      //     console.error('Error with Google Sign In:', e);
      // }
    };
    const handleCheckExitIntro = async () => {
      await dispatch(setExitIntro());
    };
    return (
      <LinearGradient
        style={{
          flex: 1,
        }}
        colors={[COLORS.white, COLORS.white]}
      >
        <View style={{ flex: 1 }}>
          <View>
            <Image
              source={require("../../assets/welcome.jpg")}
              style={{
                height: 400,
                width: 410,
                position: "absolute",
                top: 50,
              }}
            />
          </View>
  
          {/* content  */}
  
          <View
            style={{
              paddingHorizontal: 42,
              position: "absolute",
              top: 500,
              width: "100%",
            }}
          >
            <Text
              style={{
                fontSize: 40,
                fontWeight: 800,
                color: COLORS.black,
              }}
            >
              Welcome Back!
            </Text>
  
            {/* Nút Đăng Nhập Bằng Gmail */}
            <Pressable
              style={{
                backgroundColor: COLORS.white,
                paddingVertical: 12,
                borderRadius: 8,
                alignItems: "center",
                marginBottom: 12,
                marginTop: 30,
                flexDirection: "row",
                borderColor: COLORS.black,
                borderWidth: 2,
              }}
              onPress={handleGoogleLogin}
            >
              {/* Icon Gmail */}
              <Ionicons
                name="logo-google"
                size={24}
                color={COLORS.black}
                style={{ marginRight: 50, marginLeft: 20 }}
              />
              <Text style={{ color: COLORS.black, fontWeight: "bold" }}>
                Đăng nhập bằng Gmail
              </Text>
            </Pressable>
  
            {/* Nút Đăng Nhập  */}
            <Pressable
              style={{
                backgroundColor: COLORS.white,
                paddingVertical: 12,
                borderRadius: 8,
                alignItems: "center",
                borderColor: COLORS.black,
                borderWidth: 2,
              }}
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
              <Text style={{ color: COLORS.black, fontWeight: "bold" }}>
                Đăng nhập
              </Text>
            </Pressable>
            <Pressable
              style={{
                backgroundColor: COLORS.secondary,
                paddingVertical: 12,
                borderRadius: 20,
                alignItems: "center",
                marginTop: 12,
                width: "50%",
                left: 80,
              }}
              onPress={() => {
                navigation.navigate("Signup");
              }}
            >
              <Text style={{ color: COLORS.black, fontWeight: "bold" }}>
                Đăng ký{" "}
              </Text>
            </Pressable>
            {/* <TouchableOpacity onPress={() => handleCheckExitIntro()}>
              <Text
                style={{
                  color: COLORS.secondary,
                  fontWeight: "bold",
                  paddingVertical: 5,
                  borderRadius: 8,
                  alignItems: "center",
                  marginTop: 5,
                  left: 100,
                }}
              >
                Không phải bây giờ{" "}
              </Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </LinearGradient>
    );
  };
  
  export default WelcomeBack;
  