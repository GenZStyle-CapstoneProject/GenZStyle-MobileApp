

import React from 'react';
import { View, ScrollView, Button } from 'react-native';
import HomeTab from '../components/HomeTab';

import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
    const n = useNavigation()
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>

            <HomeTab />


        </View>
    );
};

export default HomeScreen;