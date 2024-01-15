import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import BottomTabNavigator from '../BottomTabNavigator/BottomTabNavigator'
import CartDetail from '../../screens/CartDetail'
import FriendScreen from '../../screens/FriendScreen'
import SettingFriends from '../../screens/Friends/SettingFriends'
import ROUTES from '../../constants/routes'
const Stack = createNativeStackNavigator()
const HomeNavigator = () => {
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

            <Stack.Screen name='nam' component={BottomTabNavigator} options={{ headerShown: false }} />
            <Stack.Screen name={ROUTES.CARTDETAIL} component={CartDetail} options={{ headerShown: false, }} />
            <Stack.Screen name={ROUTES.FRIENDS} component={FriendScreen} options={{ headerShown: false, }} />
            <Stack.Screen name={ROUTES.SETTINGFRIENDS} component={SettingFriends} options={{ headerShown: false, }} />
        </Stack.Navigator>
    )
}

export default HomeNavigator

const styles = StyleSheet.create({})
// import React from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import AuthTabNavigator from './AuthTabNavigator';
// import BottomTabNavigator from './BottomTabNavigator/BottomTabNavigator';
// import Welcome from '../screens/Welcome';

// const Stack = createNativeStackNavigator();

// const AppNavigator = () => {
//   return (
//     <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="Welcome" component={Welcome} />

//       <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
//     </Stack.Navigator>
//   );
// };

// export default AppNavigator;
