import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigator from "./BottomTabNavigator/BottomTabNavigator";
// import ProfileNavigator from './ProfileNavigation/ProfileNavigator'
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { checkExitIntro, loadAuthState } from "../features/userSlice";
import HomeNavigator from "../navigation/HomeNavigator/HomeNavigator";
import IntroTabNavigator from "./IntroTabNavigator/IntroTabNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HomeTab from "../components/Home/HomeTab";
const Stack = createNativeStackNavigator();
const AppNavigator = () => {
  const dispatch = useAppDispatch();
  const authenticated = useAppSelector((state) => state.user.authenticated);
  const isExitIntro = useAppSelector((state) => state.user.isExitIntro);
  const loadingIntro = useAppSelector((state) => state.user.loadingIntro); 

  const fetchLoadAuthState = async () => {  
    await dispatch(loadAuthState());
  }; 
  const fetchCheckExitIntro = async () => {
    await dispatch(checkExitIntro());
  };  
  console.log("authenticated: ", authenticated); 
  console.log("isExitIntro: ", isExitIntro);
  React.useEffect(() => {
    fetchCheckExitIntro();
    fetchLoadAuthState(); 
  }, []); 

  return (
    <Stack.Navigator>
      {isExitIntro || loadingIntro ? (
        <Stack.Screen
          name="tab"
          children={() => <HomeNavigator authenticated={authenticated} />}
          options={{ headerShown: false }}
        />
      ) : (
        <Stack.Screen
          name="first"
          component={IntroTabNavigator}
          options={{ headerShown: false }}
        />
      )}
      <Stack.Screen
        name="Home"
        component={HomeNavigator}
        options={{ headerShown: false }}
      />

      {/* <Stack.Screen name="Profile" component={ProfileNavigator} /> */}
    </Stack.Navigator>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({});
