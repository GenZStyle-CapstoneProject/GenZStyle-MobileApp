import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, TouchableOpacity } from 'react-native';
import ActivityTab from '../components/ActivityTab';
import NotificationTab from '../components/NotificationTab';
import NotiTab from '../components/NotiTab';

const Tab = createMaterialTopTabNavigator();

const NotificationScreen = () => {
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <NotiTab />

        </View>
    );
};

export default NotificationScreen;
