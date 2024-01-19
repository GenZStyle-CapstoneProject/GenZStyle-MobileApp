import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

const followersData = [
    { id: '1', username: 'user1', avatar: 'https://preview.redd.it/trying-to-come-up-with-a-new-avatar-for-my-various-social-v0-i3kyoe6e1lsb1.jpg?width=519&format=pjpg&auto=webp&s=af4100e59c80d5e8847b64f0ca68fa76e36547e5' },
    { id: '2', username: 'user2', avatar: 'https://preview.redd.it/trying-to-come-up-with-a-new-avatar-for-my-various-social-v0-wby69l6e1lsb1.jpg?width=519&format=pjpg&auto=webp&s=61341c3ce447f8356da3146c1903395fc43d28dc' },
    { id: '3', username: 'user3', avatar: 'https://preview.redd.it/trying-to-come-up-with-a-new-avatar-for-my-various-social-v0-i3kyoe6e1lsb1.jpg?width=519&format=pjpg&auto=webp&s=af4100e59c80d5e8847b64f0ca68fa76e36547e5' },
    { id: '4', username: 'user4', avatar: 'https://preview.redd.it/trying-to-come-up-with-a-new-avatar-for-my-various-social-v0-wby69l6e1lsb1.jpg?width=519&format=pjpg&auto=webp&s=61341c3ce447f8356da3146c1903395fc43d28dc' },
    { id: '5', username: 'user5', avatar: 'https://preview.redd.it/trying-to-come-up-with-a-new-avatar-for-my-various-social-v0-i3kyoe6e1lsb1.jpg?width=519&format=pjpg&auto=webp&s=af4100e59c80d5e8847b64f0ca68fa76e36547e5' },
    { id: '6', username: 'user6', avatar: 'https://preview.redd.it/trying-to-come-up-with-a-new-avatar-for-my-various-social-v0-wby69l6e1lsb1.jpg?width=519&format=pjpg&auto=webp&s=61341c3ce447f8356da3146c1903395fc43d28dc' },
    { id: '7', username: 'user7', avatar: 'https://preview.redd.it/trying-to-come-up-with-a-new-avatar-for-my-various-social-v0-i3kyoe6e1lsb1.jpg?width=519&format=pjpg&auto=webp&s=af4100e59c80d5e8847b64f0ca68fa76e36547e5' },
    { id: '8', username: 'user8', avatar: 'https://preview.redd.it/trying-to-come-up-with-a-new-avatar-for-my-various-social-v0-wby69l6e1lsb1.jpg?width=519&format=pjpg&auto=webp&s=61341c3ce447f8356da3146c1903395fc43d28dc' },

];

const FollowersTab = () => {
    const renderFollowerItem = ({ item }) => (
        <View style={styles.followerItem}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <Text style={styles.username}>{item.username}</Text>
            <TouchableOpacity style={styles.unfollowButton}>
                <Text style={styles.unfollowButtonText}>Gỡ</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.tabContent}>
            <FlatList
                data={followersData}
                keyExtractor={(item) => item.id}
                renderItem={renderFollowerItem}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    tabContent: {
        flex: 1,
        marginTop: 20,
    },
    listContainer: {
        paddingHorizontal: 16,

    },
    followerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 26,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 16,
    },
    username: {
        fontSize: 16,
        fontWeight: 'bold',
        flex: 1,
    },
    unfollowButton: {
        backgroundColor: '#FF5C5C',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 5,
    },
    unfollowButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default FollowersTab;
