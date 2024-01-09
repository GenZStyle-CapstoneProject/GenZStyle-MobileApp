import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../../../screens/HomeScreen'
import CartDetail from '../../../screens/CartDetail'
import ROUTES from '../../../constants/routes'

const Stack = createNativeStackNavigator()
const HomeNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={ROUTES.HOME} component={HomeScreen} options={{ headerShown: false, }} />

    </Stack.Navigator>
  )
}

export default HomeNavigator

const styles = StyleSheet.create({})