import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import HomeFollowing from '../../components/Home/HomeFollowing';

const EveryoneScreen = () => {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
        <HomeFollowing/>
        <HomeFollowing/>     
        <HomeFollowing/>     
        <HomeFollowing/>     
        <HomeFollowing/>
        <HomeFollowing/>  
    </ScrollView>
  )
}

export default EveryoneScreen

const styles = StyleSheet.create({})