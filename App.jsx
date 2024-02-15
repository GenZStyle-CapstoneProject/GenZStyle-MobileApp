
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { Start, Welcome, Login, Signup, HomeScreen, ProfileScreen, SearchScreen, PostScreen, NotificationsScreen } from './screens';
// import HomeTab from './components/HomeTab'
import AppNavigator from './src/navigation/AppNavigator';
import 'react-native-gesture-handler'
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style = {{ flex:1 }}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
