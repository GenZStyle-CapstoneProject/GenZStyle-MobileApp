
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { Start, Welcome, Login, Signup, HomeScreen, ProfileScreen, SearchScreen, PostScreen, NotificationsScreen } from './screens';
// import HomeTab from './components/HomeTab'
import AppNavigator from './src/navigation/AppNavigator';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}
