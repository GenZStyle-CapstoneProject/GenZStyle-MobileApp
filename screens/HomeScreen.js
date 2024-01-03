

import React from 'react';
import { View, ScrollView } from 'react-native';
import HomeTab from '../components/HomeTab';
import BottomTabBar from '../components/BottomTabBar';

const HomeScreen = () => {
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>

            <HomeTab />


            <BottomTabBar />
        </View>
    );
};

export default HomeScreen;