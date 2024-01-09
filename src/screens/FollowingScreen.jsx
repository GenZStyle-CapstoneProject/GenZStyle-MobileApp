
import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import HomeFollowing from '../components/HomeFollowing';
import HeaderHomeFollowing from '../components/HeaderHomeFollowing';





const FollowingScreen = () => (
    <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
        <HeaderHomeFollowing/>
        <HomeFollowing/>
        <HomeFollowing/>     
        <HomeFollowing/>     
        <HomeFollowing/>     
        <HomeFollowing/>
        <HomeFollowing/>  
    </ScrollView>
);

const style = StyleSheet.create({

})


export default FollowingScreen;

