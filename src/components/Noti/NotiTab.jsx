import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View } from 'react-native';
import ActivityTab from './ActivityTab';
import NotificationTab from './NotificationTab';

const Tab = createMaterialTopTabNavigator();

const NotiTab = () => {
    return (
        <View style={{ flex: 1, marginTop: 40, backgroundColor: 'white' }}>
            <Tab.Navigator
                screenOptions={{
                    tabBarActiveTintColor: 'black',
                    tabBarInactiveTintColor: 'gray',
                    tabBarIndicatorStyle: { backgroundColor: 'black' },
                    tabBarStyle: { backgroundColor: 'white', borderTopWidth: 2, borderTopColor: 'transparent' },
                    tabBarLabelStyle: { fontWeight: 'bold' },
                }}
            >
                <Tab.Screen name="Hoạt động" component={ActivityTab} />
                <Tab.Screen name="Thông báo" component={NotificationTab} />
            </Tab.Navigator>
        </View>
    );
};

export default NotiTab;
