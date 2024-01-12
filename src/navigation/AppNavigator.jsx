import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import BottomTabNavigator from './BottomTabNavigator/BottomTabNavigator'
// import ProfileNavigator from './ProfileNavigation/ProfileNavigator'
import HomeNavigator from './HomeNavigator/HomeNavigator'
const Stack = createNativeStackNavigator()
const AppNavigator = () => {
  const [isAuth, setIsAuth] = useState(false);
  const fetchData = async () => {
    // get Data
  }
  useEffect(() => {
    fetchData()
    console.log('Trang đầu tiên');
  }, []);

  return (
    <Stack.Navigator>

      <Stack.Screen name='tab' component={HomeNavigator} options={{ headerShown: false }} />
      {/* <Stack.Screen name="Profile" component={ProfileNavigator} /> */}
    </Stack.Navigator>
  )
}

export default AppNavigator

const styles = StyleSheet.create({})

