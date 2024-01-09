import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, TouchableOpacity } from 'react-native';
import ActivityTab from './ActivityTab';
import NotificationTab from './NotificationTab';

const Tab = createMaterialTopTabNavigator();

const NotiTab = () => {
    return (
        <View style={{ flex: 1, marginTop: 40, backgroundColor: 'white' }}>
            <Tab.Navigator
                tabBarOptions={{
                    activeTintColor: 'black',
                    inactiveTintColor: 'gray',
                    indicatorStyle: { backgroundColor: 'black' },
                    style: { backgroundColor: 'white' },

                }}
            >
                <Tab.Screen name="Hoạt động" component={ActivityTab} />
                <Tab.Screen name="Thông báo" component={NotificationTab} />
            </Tab.Navigator>

        </View>
    );
};

export default NotiTab;
