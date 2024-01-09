import React from 'react';
import { View, FlatList, StyleSheet, Image } from 'react-native';
import HeaderProfile from '../components/HeaderProfile';
import ProfileTab from '../components/ProfileTab';

const ProfileScreen = () => {


    return (
        <View style={styles.container}>
            <HeaderProfile />
            <View style={styles.hr} />
            <ProfileTab />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    hr: {
        borderBottomColor: 'lightgray',
        borderBottomWidth: 1,
        marginTop: 20,

    },


});

export default ProfileScreen;
