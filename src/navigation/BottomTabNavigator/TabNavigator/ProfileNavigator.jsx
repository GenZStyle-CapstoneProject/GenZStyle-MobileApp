import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ROUTES from '../../../constants/routes'
import ProfileScreen from '../../../screens/ProfileScreen'

const Stack = createNativeStackNavigator()
const ProfileNavigator = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name={ROUTES.PROFILE} component={ProfileScreen} options={{headerShown: false,}}/>
    </Stack.Navigator>
  )
}

export default ProfileNavigator

const styles = StyleSheet.create({})