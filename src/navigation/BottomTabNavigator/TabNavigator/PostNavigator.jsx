import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ROUTES from '../../../constants/routes'
import PostScreen from '../../../screens/PostScreen'

const Stack = createNativeStackNavigator()
const PostNavigator = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name={ROUTES.POST} component={PostScreen} options={{headerShown: false,}}/>
    </Stack.Navigator>
  )
}

export default PostNavigator

const styles = StyleSheet.create({})