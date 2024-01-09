import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../../screens/HomeScreen'
import PostScreen from '../../screens/PostScreen'
import { FontAwesome } from '@expo/vector-icons'; // Import the icons
import HomeNavigator from './TabNavigator/HomeNavigator';
import ROUTES from '../../constants/routes';
import SearchNavigator from './TabNavigator/SearchNavigator'
import PostNavigator from './TabNavigator/PostNavigator'
import NotificationNavigator from './TabNavigator/NotificationNavigator'
import ProfileNavigator from './TabNavigator/ProfileNavigator'

const Stack = createBottomTabNavigator()
const BottomTabNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{}}>
      <Stack.Screen name={ROUTES.HOME_NAVIGATOR} component={HomeNavigator} options={{
        headerShown: false,
        tabBarIcon: ({ }) => {
          return <FontAwesome name="home" size={24} color="black" />
        }
      }} />
      <Stack.Screen name={ROUTES.SEARCH_NAVIGATOR} component={SearchNavigator} options={{
        headerShown: false,
        tabBarIcon: ({ }) => {
          return <FontAwesome name="search" size={24} color="black" />
        }
      }} />
      <Stack.Screen name={ROUTES.POST_NAVIGATOR} component={PostNavigator} options={{
        headerShown: false,
        tabBarIcon: ({ }) => {
          return <FontAwesome name="plus" size={24} color="black" />
        }
      }} />
      <Stack.Screen name={ROUTES.NOTIFICATION_NAVIGATOR} component={NotificationNavigator} options={{
        headerShown: false,
        tabBarIcon: ({ }) => {
          return <FontAwesome name="bell" size={24} color="black" />
        }
      }} />
      <Stack.Screen name={ROUTES.PROFILE_NAVIGATOR} component={ProfileNavigator} options={{
        headerShown: false,
        tabBarIcon: ({ }) => {
          return <FontAwesome name="user" size={24} color="black" />
        }
      }} />
    </Stack.Navigator>
  )
}

export default BottomTabNavigator

const styles = StyleSheet.create({})