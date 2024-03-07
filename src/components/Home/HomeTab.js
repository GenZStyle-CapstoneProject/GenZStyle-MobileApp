

import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ForYouScreen from "../../screens/ForYouScreen";
import FollowingScreen from "../../screens/FollowingScreen";
import ROUTES from '../../constants/routes';
import { useNavigation } from '@react-navigation/native';
import { IconButton } from 'react-native-paper';
const Tab = createMaterialTopTabNavigator();

const HomeTab = () => {
    const navigation = useNavigation();
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
            <View style={{ position: 'absolute', paddingTop: 2, alignSelf: 'flex-end', padding: 5 }}>
                <TouchableOpacity onPress={() => navigation.navigate(ROUTES.CONVERSATIONS)}>
                    <IconButton
                        icon="chat"
                        color="#000"
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default HomeTab;
