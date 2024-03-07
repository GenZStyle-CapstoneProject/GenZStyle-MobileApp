// import React, { useState, useCallback } from "react";
// import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
// import Icon from "react-native-vector-icons/MaterialCommunityIcons";
// import { useFocusEffect, useNavigation } from "@react-navigation/native";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchMyPost } from "../../app/MyPost/action";
// import { FlatList } from "react-native";

// const MyPostsScreen = () => {

//     const [loading, setLoading] = useState(true);
//     const navigation = useNavigation();
//     const [dataPost, setDataMyPost] = useState([]);
//     const accountId = useSelector((state) => state.user.accountId);
//     console.log('accountId cua toi ', accountId);
//     const [likedPosts, setLikedPosts] = useState([]);
//     const dataMyPost = useSelector((state) => state.fetchMyPost?.posts);
//     const dispatch = useDispatch();

//     // useFocusEffect(
//     //     useCallback(() => {
//     //         dispatch(fetchMyPost(accountId)).then((result) => {
//     //             if (result.payload) {
//     //                 console.log("Data received:", result.payload);
//     //                 console.log('MyPosts:', dataMyPost.posts);

//     //                 if (dataMyPost.posts && dataMyPost.posts.length > 0) {
//     //                     console.log("Posts contents:", JSON.stringify(dataMyPost.posts, null, 2));
//     //                 } else {
//     //                     console.log("No posts available.");
//     //                 }


//     //                 setDataMyPost(result.payload.posts);
//     //                 setLikedPosts([]);
//     //             } else {
//     //                 console.log("Error received:", result.error);
//     //             }
//     //         });
//     //     }, [dispatch])
//     // );

//     useFocusEffect(
//         useCallback(() => {
//             dispatch(fetchMyPost(accountId)).then((result) => {
//                 if (result.payload) {
//                     console.log("Data received:", result.payload);
//                     console.log('MyPosts:', dataMyPost);
//                     setDataMyPost(result.payload.posts);
//                     setLikedPosts([]);
//                 } else {
//                     console.log("Error received:", result.error);
//                 }
//             });
//         }, [dispatch])
//     );
//     // const handleLikePress = (postId) => {

//     //     const index = dataMyPost.findIndex((post) => post.postId === postId);


//     //     setDataMyPost((prevData) => {
//     //         const newData = [...prevData];
//     //         newData[index] = {
//     //             ...newData[index],
//     //             isLiked: !newData[index]?.isLiked,
//     //         };
//     //         return newData;
//     //     });


//     //     setLikedPosts((prevLikedPosts) => {
//     //         if (prevLikedPosts.includes(postId)) {
//     //             return prevLikedPosts.filter((id) => id !== postId);
//     //         } else {
//     //             return [...prevLikedPosts, postId];
//     //         }
//     //     });
//     // };

//     // const navigateToListLike = (postId) => {
//     //     const post = dataMyPost.find((p) => p.postId === postId);
//     //     if (post) {
//     //         navigation.navigate("ListLike", {
//     //             dataLike: post,
//     //         });
//     //     }
//     // };

//     const renderItem = ({ item }) => {
//         console.log('Item:', item);

//         return (
//             <View key={item.postId} style={styles.postContainer}>
//                 <TouchableOpacity
//                 // onPress={() => navigation.navigate("MyPostDetail", { item })}
//                 >
//                     <Image source={{ uri: item.image }} style={styles.postImage} />
//                     <View style={styles.postFooter}>
//                         <View style={styles.iconContainer}>
//                             <TouchableOpacity style={styles.icon}
//                             // onPress={() => handleLikePress(item.postId)}
//                             >
//                                 <Icon
//                                     name={item.isLiked ? "heart" : "heart-outline"}
//                                     size={24}
//                                     style={[
//                                         styles.icon,
//                                         likedPosts.includes(item.postId) && { color: "red" },
//                                     ]}
//                                 />
//                                 <Text style={styles.iconText}>{item.likes.length}</Text>
//                             </TouchableOpacity>
//                             <TouchableOpacity
//                                 style={styles.icon}
//                             // onPress={() => navigation.navigate("ListLike", { postId: item.postId })}
//                             >
//                                 <Icon name="chat-outline" size={24} color="black" />
//                                 <Text style={styles.iconText}>{item.comments}</Text>
//                             </TouchableOpacity>
//                         </View>
//                         <View style={styles.textContainer}>
//                             <View style={styles.textRow}>
//                                 <Text numberOfLines={2} ellipsizeMode="tail" style={styles.titleText}>
//                                     {item.content}
//                                 </Text>
//                             </View>
//                             <View style={styles.textRow}>
//                                 <Text style={styles.hashtagText}>{item.hashtag}</Text>
//                             </View>
//                         </View>
//                     </View>
//                 </TouchableOpacity>
//             </View>
//         );
//     };



//     return (
//         <View style={styles.container}>
//             <FlatList
//                 data={dataMyPost.posts}
//                 keyExtractor={(item) => item.postId.toString()}
//                 renderItem={renderItem}
//                 numColumns={2}
//             />

//         </View>
//     );
// };




// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "#ffffff",
//         padding: 16,
//     },
//     postContainer: {
//         marginBottom: 16,
//         marginRight: 16,
//         borderRadius: 8,
//         overflow: "hidden",
//     },
//     postImage: {
//         width: "100%",
//         height: 200,
//         resizeMode: "cover",
//         borderRadius: 8,
//     },
//     postFooter: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         alignItems: "center",
//         padding: 8,
//         backgroundColor: "#f9f9f9",
//     },
//     iconContainer: {
//         flexDirection: "row",
//         alignItems: "center",
//     },
//     icon: {
//         flexDirection: "row",
//         alignItems: "center",
//         marginRight: 16,
//     },
//     iconText: {
//         marginLeft: 4,
//         color: "#333333",
//     },
//     textContainer: {
//         flex: 1,
//         marginLeft: 8,
//     },
//     textRow: {
//         flexDirection: "row",
//         alignItems: "center",
//     },
//     titleText: {
//         fontSize: 16,
//         fontWeight: "bold",
//         color: "#333333",
//     },
//     hashtagText: {
//         color: "#666666",
//         marginTop: 4,
//     },
// });

// export default MyPostsScreen;
import React, { useState, useCallback } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyPost } from "../../app/MyPost/action";
import { FlatList } from "react-native";

const MyPostsScreen = () => {
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();
    const [dataPost, setDataMyPost] = useState([]);
    const accountId = useSelector((state) => state.user.accountId);
    console.log('accountId cua toi ', accountId);
    const [likedPosts, setLikedPosts] = useState([]);
    const dataMyPost = useSelector((state) => state.fetchMyPost?.posts);
    const dispatch = useDispatch();
    useFocusEffect(
        useCallback(() => {
            dispatch(fetchMyPost(accountId)).then((result) => {
                if (result.payload) {
                    setDataMyPost(result.payload.posts);
                    setLikedPosts([]);
                } else {
                    console.log("Error received:", result.error);
                }
            });
        }, [dispatch])
    );

    const renderItem = ({ item }) => {
        return (
            <View key={item.postId} style={styles.postContainer}>
                <TouchableOpacity>
                    <Image source={{ uri: item.image }} style={styles.postImage} />
                    <View style={styles.overlayContainer}>
                        <View style={styles.iconContainer}>
                            <TouchableOpacity style={styles.icon}>
                                <Icon
                                    name={item.isLiked ? "heart" : "heart-outline"}
                                    size={24}
                                    style={[
                                        styles.icon,
                                        likedPosts.includes(item.postId) && { color: "red" },
                                    ]}
                                />
                                <Text style={styles.iconText}>{item.likes.length}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.icon}>
                                <Icon name="chat-outline" size={24} color="black" />
                                <Text style={styles.iconText}>{item.comments}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.postFooter}>
                        {/* ... existing code ... */}
                    </View>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={dataMyPost.posts}
                keyExtractor={(item) => item.postId.toString()}
                renderItem={renderItem}
                numColumns={2}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        padding: 16,
    },
    postContainer: {
        marginBottom: 16,
        marginRight: 16,
        width: "48%",
        borderRadius: 8,
        overflow: "hidden",
    },
    postImage: {
        width: "200%",
        height: 200,
        resizeMode: "cover",
        borderRadius: 8,
    },
    overlayContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "rgba(255, 255, 255, 0.7)", // Adjust the alpha (fourth value) as needed
    },
    iconContainer: {
        flexDirection: "row",
        alignItems: "center",
        position: "absolute",
        bottom: 8,
        left: 8,
    },
    icon: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 5,
        // backgroundColor: "rgba(255, 255, 255, 0.5)", // Adjust the alpha channel for transparency
        borderRadius: 20, // Adjust the borderRadius to make it rounded
        padding: 10, // Add some padding for better appearance
    },

    iconText: {
        marginLeft: 4,
        color: "#333333",
    },
    postFooter: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 8,
        backgroundColor: "#f9f9f9",
    },
    textContainer: {
        flex: 1,
        marginLeft: 8,
    },
    textRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    titleText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333333",
    },
    hashtagText: {
        color: "#666666",
        marginTop: 4,
    },
});

export default MyPostsScreen;
