

import React from 'react';
import { View, ScrollView, Button } from 'react-native';
import HomeTab from '../components/HomeTab';
import BottomTabBar from '../components/BottomTabBar';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
    const n = useNavigation()
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>

            <HomeTab />
            {/* <Button title='navigate to profile' onPress={() => n.navigate('Profile')} /> */}

        </View>
    );
};

export default HomeScreen;