import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const HeaderProfile = () => {
    return (
        <View style={styles.header}>
            <View style={styles.iconContainer}>
                <TouchableOpacity>
                    <Ionicons name="chatbox-ellipses-outline" size={24} color="black" style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Ionicons name="share-social-outline" size={24} color="black" style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity>
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
                    <Text style={styles.username}>Thanh Phu</Text>
                    <Text style={styles.account}>@phungu</Text>
                </View>
            </View>
            <Text style={styles.bioContent}>Just do it</Text>

            <View style={styles.bioContainer}>
                <View style={styles.bioColumn}>
                    <Text style={styles.bioCount}>0</Text>
                    <Text style={styles.bioText}>Người theo dõi</Text>
                </View>
                <View style={styles.bioColumn}>
                    <Text style={styles.bioCount}>5</Text>
                    <Text style={styles.bioText}>Đang theo dõi</Text>
                </View>
                <TouchableOpacity style={styles.addBioButton}>
                    <Text style={styles.addBioButtonText}>Thêm tiểu sử</Text>
                </TouchableOpacity>
            </View>
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
