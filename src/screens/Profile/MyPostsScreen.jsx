// import React from 'react';
// import { View, FlatList, StyleSheet, Image } from 'react-native';

// const MyPostsScreen = ({ userPosts }) => {

//     return (
//         <View style={styles.postContainer}>
//             <FlatList
//                 data={userPosts}
//                 keyExtractor={(item) => item.postId.toString()}
//                 numColumns={3}
//                 renderItem={({ item }) => {
//                     console.log('Rendering item:', item);
//                     return (
//                         <View style={styles.postContainer}>
//                             <Image source={{ uri: item.image }} style={styles.postImage} />
//                         </View>
//                     );
//                 }}
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     postContainer: {
//         flex: 1,
//         aspectRatio: 1,
//         margin: 1,
//     },
//     postImage: {
//         flex: 1,
//         resizeMode: 'cover',
//     },
// });

// export default MyPostsScreen;
// MyPostsScreen.js
import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Image, Text } from 'react-native';

const MyPostsScreen = ({ accountId }) => {
    const [userPosts, setUserPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://genzstyleappapi20240126141439.azurewebsites.net/odata/Posts/${accountId}/GetPostByAccountId`);
                const data = await response.json();
                console.log('Fetched data:', data); // Log the fetched data
                setUserPosts(data.posts || []); // Use an empty array if 'posts' is undefined
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [accountId]);

    useEffect(() => {
        console.log('userPosts:', userPosts); // Log userPosts whenever it changes
    }, [userPosts]);

    return (
        <View style={styles.postContainer}>
            <FlatList
                data={userPosts}
                keyExtractor={(item) => item.postId.toString()}
                numColumns={3}
                renderItem={({ item }) => (
                    <View style={styles.postContainer}>
                        <Image source={{ uri: item.image }} style={styles.postImage} />
                        <Text>{item.content}</Text>
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

