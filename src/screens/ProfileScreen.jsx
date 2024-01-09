import React from 'react';
import { View, StyleSheet } from 'react-native';
import HeaderProfile from '../components/Profile/HeaderProfile';
import ProfileTab from '../components/Profile/ProfileTab';

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
