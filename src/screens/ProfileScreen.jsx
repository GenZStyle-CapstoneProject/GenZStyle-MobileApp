import React from 'react';
import { View, StyleSheet } from 'react-native';
import HeaderProfile from '../components/Profile/HeaderProfile';
import ProfileTab from '../components/Profile/ProfileTab';
import { useSelector } from 'react-redux';
const ProfileScreen = () => {
    const userInfo = useSelector((state) => state.user.userInfo);


    return (
        <View style={styles.container}>
            <HeaderProfile userInfo={userInfo} />
            <View style={styles.hr} />
            <ProfileTab userInfo={userInfo} />

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
