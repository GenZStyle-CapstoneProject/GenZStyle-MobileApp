import React from 'react';
import { View, FlatList, StyleSheet, Image } from 'react-native';

const MyPostsScreen = () => {
    const userPosts = [
        { id: '1', image: 'https://placekitten.com/200/200' },
        { id: '2', image: 'https://placekitten.com/201/200' },
        { id: '3', image: 'https://placekitten.com/200/201' },
        // Add more posts as needed
    ];
    return (
        <View style={styles.postContainer}>
            <FlatList
                data={userPosts}
                keyExtractor={(item) => item.id}
                numColumns={3}
                renderItem={({ item }) => (
                    <View style={styles.postContainer}>
                        <Image source={{ uri: item.image }} style={styles.postImage} />
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({

    postContainer: {
        flex: 1,
        aspectRatio: 1,
        margin: 1,
    },
    postImage: {
        flex: 1,
        resizeMode: 'cover',
    },
});

export default MyPostsScreen;