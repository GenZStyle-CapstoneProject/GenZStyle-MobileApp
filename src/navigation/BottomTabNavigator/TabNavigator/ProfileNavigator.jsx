import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ROUTES from '../../../constants/routes'
import ProfileScreen from '../../../screens/ProfileScreen'
import SettingScreen from '../../../screens/Profile/SettingScreen'
import UpdateProfileScreen from '../../../screens/Profile/UpdateProfileScreen'
import ListFollowScreen from '../../../screens/Profile/ListFollowScreen'
import SettingPackage from '../../../screens/SettingPackage/SettingPackage'
import PackageHistoryScreen from '../../../screens/SettingPackage/PackageHistoryScreen'
import Login from '../../../screens/Login'
const Stack = createNativeStackNavigator()
const ProfileNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={ROUTES.PROFILE} component={ProfileScreen} options={{ headerShown: false, }} />
      <Stack.Screen name={ROUTES.SETTING} component={SettingScreen} options={{ headerShown: false, }} />
      <Stack.Screen name={ROUTES.UPDATEPROFILE} component={UpdateProfileScreen} options={{ headerShown: false, }} />
      <Stack.Screen name={ROUTES.LISTFOLLOW} component={ListFollowScreen} options={{ headerShown: false, }} />
      <Stack.Screen name={ROUTES.SETTINGPACKAGE} component={SettingPackage} options={{ headerShown: false, }} />
      <Stack.Screen name={ROUTES.PACKAGEHISTORY} component={PackageHistoryScreen} options={{ headerShown: false, }} />
      <Stack.Screen name={'Login'} component={Login} options={{ headerShown: false, }} />
    </Stack.Navigator>
  )
}

export default ProfileNavigator

const styles = StyleSheet.create({})