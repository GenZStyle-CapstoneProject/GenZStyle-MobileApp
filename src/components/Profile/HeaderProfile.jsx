import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


const HeaderProfile = ({ userInfo }) => {
    const navigation = useNavigation();

    const handleSetting = () => {
        navigation.navigate('Setting');
    };

    const handleFollowers = () => {
        navigation.navigate('ListFollow', { screen: 'Người theo dõi' });
    };

    const handleFollowing = () => {
        navigation.navigate('ListFollow', { screen: 'Đang theo dõi' });
    };

    return (
        <View style={styles.header}>
            {/* Rest of your component code */}
            <View style={styles.iconContainer}>
                <TouchableOpacity>
                    <Ionicons name="chatbox-ellipses-outline" size={24} color="black" style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Ionicons name="share-social-outline" size={24} color="black" style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSetting}>
                    <Ionicons name="settings-outline" size={24} color="black" style={styles.icon} />
                </TouchableOpacity>
            </View>
            <View style={styles.topRow}>
                <View style={styles.avatarContainer}>
                    <Image
                        source={require('../../../assets/avatar.jpg')}
                        style={styles.profileImage}
                    />
                </View>
                <View style={styles.userInfo}>
                    <Text style={styles.username}>{userInfo.fullName}</Text>
                    <Text style={styles.account}>{userInfo.email}</Text>
                    <Text style={styles.account}>{userInfo.accountId}</Text>
                </View>
            </View>
            <Text style={styles.bioContent}>Just do it </Text>

            <View style={styles.bioContainer}>
                <View style={styles.bioColumn}>
                    <TouchableOpacity onPress={handleFollowers}>
                        <Text style={styles.bioCount}>222</Text>
                        <Text style={styles.bioText}>Người theo dõi</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.bioColumn}>
                    <TouchableOpacity onPress={handleFollowing}>
                        <Text style={styles.bioCount}>222</Text>
                        <Text style={styles.bioText}>Đang theo dõi</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/* Rest of your component code */}
        </View>
    );
};



const styles = StyleSheet.create({
    header: {
        flexDirection: 'column',
        paddingHorizontal: 20,
        marginTop: 70,
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 10,
    },
    topRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarContainer: {
        marginRight: 20,
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    userInfo: {
        flex: 1,
    },
    username: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    account: {
        fontSize: 16,
        marginTop: 5,
        color: 'gray',
    },
    icon: {
        marginLeft: 20,
    },
    bioContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    bioColumn: {
        alignItems: 'center',
    },
    bioCount: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    bioText: {
        fontSize: 14,
        color: 'gray',
    },
    addBioButton: {
        backgroundColor: '#99A1E8',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 5,
    },
    addBioButtonText: {
        color: 'white',
        fontWeight: 'bold',
        marginTop: 5,

    },
    bioContent: {
        fontSize: 16,
        marginTop: 10,
    }
});

export default HeaderProfile;
