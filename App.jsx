
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
{/* <Stack.Navigator >
        <Stack.Screen
          name='Start'
          component={Start}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Welcome'
          component={Welcome}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Login'
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Signup'
          component={Signup}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='HomeScreen'
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Search'
          component={SearchScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Profile'
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Post'
          component={PostScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Notifications'
          component={NotificationsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='HomeTab'
          component={HomeTab}
          options={{ headerShown: false }}
        />

      </Stack.Navigator> */}