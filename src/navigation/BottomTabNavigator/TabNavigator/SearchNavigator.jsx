import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ROUTES from '../../../constants/routes'
import SearchScreen from '../../../screens/SearchScreen'


const Stack = createNativeStackNavigator()
const SearchNavigator = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name={ROUTES.SEARCH} component={SearchScreen} options={{headerShown: false,}}/>
    </Stack.Navigator>
  )
}

export default SearchNavigator

const styles = StyleSheet.create({})