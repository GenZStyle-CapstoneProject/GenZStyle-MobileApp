import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { Start, Welcome, Login, Signup, HomeScreen, ProfileScreen, SearchScreen, PostScreen, NotificationsScreen } from './screens';
// import HomeTab from './components/HomeTab'
import AppNavigator from "./src/navigation/AppNavigator";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import { store } from "./src/app/store";
import { AuthContextProvider } from "./src/contexts/AuthContext";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AuthContextProvider>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </AuthContextProvider>
      </GestureHandlerRootView>
    </Provider>
  );
}
