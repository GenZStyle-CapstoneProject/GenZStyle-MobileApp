

import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ForYouScreen from "../screens/ForYouScreen";
import FollowingScreen from "../screens/FollowingScreen";

const Tab = createMaterialTopTabNavigator();

const HomeTab = () => {
    return (
        <View style={{ flex: 1, marginTop: 40 }}>
            <Tab.Navigator
                screenOptions={{
                    tabBarActiveTintColor: 'black',
                    tabBarInactiveTintColor: 'gray',
                    tabBarIndicatorStyle: { backgroundColor: 'black' },
                    tabBarStyle: { backgroundColor: 'white' },

                }}
            >
                <Tab.Screen name="Dành cho bạn" component={ForYouScreen} />
                <Tab.Screen name="Đang theo dõi" component={FollowingScreen} />

            </Tab.Navigator>
            <View style={{ position: 'absolute', top: 0, right: 0, padding: 10 }}>
                <TouchableOpacity onPress={() => { }}>
                    <Ionicons name="chatbubble-ellipses" size={30} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default HomeTab;
