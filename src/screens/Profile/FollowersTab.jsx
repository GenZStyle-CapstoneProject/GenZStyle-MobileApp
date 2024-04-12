import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import ROUTES from "../../constants/routes";
import { useNavigation } from "@react-navigation/native";



const FollowersTab = ({ route }) => {
    const navigation = useNavigation();
    const followersData = route.params?.followersData || [];

    const navigateToFriend = (item) => {
        navigation.navigate(ROUTES.FRIENDS, { item });
      };
    const renderFollowingItem = ({ item }) => (
        <View style={styles.followerItem}>
            <TouchableOpacity onPress={() => navigateToFriend(item)}>
            <Image style={styles.avatar} source={{ uri: item?.avatar }} />
            </TouchableOpacity>
            
            <Text style={styles.username}>{item?.username}</Text>
            <TouchableOpacity style={styles.unfollowButton}>
                <Text style={styles.unfollowButtonText}>Gỡ</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.tabContent}>
            <FlatList
                data={followersData.followers}
                keyExtractor={(item) => item.accountId}
                renderItem={renderFollowingItem}
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
