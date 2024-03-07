
import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import HomeFollowing from '../components/Home/HomeFollowing';
import HeaderHomeFollowing from '../components/Home/HeaderHomeFollowing';





const FollowingScreen = () => (
    <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
        {/* <HeaderHomeFollowing /> */}
        <HomeFollowing />

    </ScrollView>
);

const style = StyleSheet.create({

})


export default FollowingScreen;

