import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ROUTES from '../../../constants/routes'
import SearchScreen from '../../../screens/SearchScreen'
import HashtagView from '../../../screens/Search/HashtagView'
import Chat from '../../../screens/Search/Chat'
import ReportUser from '../../../screens/Friends/ReportUser'

const Stack = createNativeStackNavigator()
const SearchNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={ROUTES.SEARCH}>
      <Stack.Screen name={ROUTES.SEARCH} component={SearchScreen} options={{ headerShown: false, }} />
      <Stack.Screen name={ROUTES.HASHTAGVIEW} component={HashtagView} options={{ headerShown: false, }} />
      <Stack.Screen name={ROUTES.CHAT} component={Chat} options={{ headerShown: false, }} />
      <Stack.Screen name={ROUTES.REPORTUSER} component={ReportUser} options={{ headerShown: false, }} />
    </Stack.Navigator>
  )
}

export default SearchNavigator

const styles = StyleSheet.create({})