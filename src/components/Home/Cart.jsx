import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Cart = ({ item }) => {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();
    const [isLiked, setIsLiked] = useState(false);

    const handleLikePress = () => {
        setIsLiked(!isLiked);
    };
    const navigateToListLike = () => {
        navigation.navigate('ListLike');
    };

    const fetchAllPosts = async () => {
        try {
            const response = await axios.get('https://genzstyleappapi20240126141439.azurewebsites.net/odata/Posts/Active/Post');
            console.log('Axios Response:', response.data);

            if (Array.isArray(response.data)) {
                setPosts(response.data);
            } else if (Array.isArray(response.data.value)) {
                setPosts(response.data.value);
            } else {
                console.error('Invalid response format. Expected an array.');
            }

            setLoading(false);
        } catch (error) {
            console.error('Error fetching posts:', error);
            console.error('Error details:', error.response?.data);
        }
    };



    useEffect(() => {
        fetchAllPosts();
    }, []);

    return (
        <View>
            {loading ? (
                <ActivityIndicator size="large" color="black" />
            ) : (
                <View>
                    {posts.map((post) => (
                        <View key={post.id} style={styles.postContainer}>
                            <Image source={{ uri: post.image }} style={styles.postImage} />
                            <View style={styles.postFooter}>
                                <View style={styles.iconContainer}>
                                    <TouchableOpacity style={styles.icon} onPress={handleLikePress}>
                                        <Icon
                                            name={isLiked ? 'heart' : 'heart-outline'}
                                            size={24}
                                            color={isLiked ? 'red' : 'black'}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.icon} onPress={navigateToListLike}>
                                        <Text style={styles.iconText}>24</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.icon}>
                                        <Icon name="chat-outline" size={24} color="black" />
                                        <Text style={styles.iconText}></Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.textContainer}>
                                    <View style={styles.textRow}>
                                        <Text style={styles.titleText}>
                                            {post.content}
                                        </Text>
                                    </View>
                                    <View style={styles.textRow}>
                                        <Text style={styles.hashtagText}>{post.hashtag}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    postContainerScrollView: {
        marginLeft: 5,
        marginRight: 5,
        paddingHorizontal: 0,
        paddingVertical: 20,
        overflow: 'hidden',
    },
    postContainer: {
        margin: 10,


        overflow: 'hidden',
    },
    postImage: {
        width: 185,
        height: 232,
        resizeMode: 'cover',
    },

    postFooter: {
        flexDirection: 'col',
        justifyContent: 'space-between',
        padding: 10,
    },
    iconContainer: {
        flexDirection: 'row',
    },
    icon: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
    },
    iconText: {
        marginLeft: 5,
    },
    textContainer: {
        marginLeft: 10,
        flexDirection: 'column',
    },
    textRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 5,
        marginLeft: -10,
    },
    hashtagText: {
        color: 'black',
        marginTop: 5,
        marginLeft: -10,
    },
    commentText: {
        color: 'black',
        marginTop: 5,
    },

});

export default Cart;
