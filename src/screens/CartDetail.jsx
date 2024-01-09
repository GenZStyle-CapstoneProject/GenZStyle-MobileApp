import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
const CartDetail = ({ route }) => {
    const navigation = useNavigation();
    const { item } = route.params;


    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);


    const handleAddComment = () => {
        if (comment.trim() !== '') {
            setComments([...comments, comment]);
            setComment('');
        }
    };

    return (
        <View style={styles.container}>
            {/* Back button */}
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Icon name="close" size={40} color="white" />
            </TouchableOpacity>
            {/* Hình ảnh sản phẩm */}
            <Image source={{ uri: item.image }} style={styles.image} />




            {/* Icon trái tim và bình luận */}
            <View style={styles.iconContainer}>
                <TouchableOpacity style={styles.icon}>
                    <Icon name="heart-outline" size={24} color="black" />
                    <Text style={styles.iconText}>(10)</Text>


                </TouchableOpacity>
                <TouchableOpacity style={styles.icon}>
                    <Icon name="chat-outline" size={24} color="black" />
                    <Text style={styles.iconText}></Text>
                </TouchableOpacity>
            </View>
            <View style={styles.textRow}>
                <Text style={styles.titleText}>Denisa  Elena Aboaice</Text>
            </View>
            <View style={styles.textRow}>
                <Text style={styles.hashtagText}>{item.hashtag}</Text>
            </View>
            {/* Danh sách bình luận */}
            <FlatList
                data={comments}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.commentContainer}>
                        <Text>{item}</Text>
                    </View>
                )}
            />

            {/* Phần nhập bình luận */}
            <View style={styles.commentInputContainer}>
                <TextInput
                    style={styles.commentInput}
                    placeholder="Thêm bình luận ..."
                    value={comment}
                    onChangeText={(text) => setComment(text)}
                />
                <TouchableOpacity onPress={handleAddComment}>
                    <Text style={styles.addCommentButton}>Thêm</Text>
                </TouchableOpacity>
            </View>







        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',

    },
    backButton: {
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 1,
    },
    image: {
        width: '100%',
        height: 600,
        resizeMode: 'cover',
        marginBottom: 16,
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'start',
        marginBottom: 5,
    },
    commentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        // backgroundColor: '#E3E5F8',
        backgroundColor: 'gray',
        borderRadius: 20,
        padding: 8,
    },
    commentIcon: {
        marginRight: 8,
    },
    commentTextPlaceholder: {
        color: '#333',
        fontStyle: 'italic',
        marginRight: 8,
    },
    commentText: {
        flex: 1,
    },
    commentInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16,
    },
    commentInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
        padding: 8,
        marginRight: 8,
    },
    addCommentButton: {
        color: 'blue',
        fontWeight: 'bold',
    },
    textRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 5,

    },
    icon: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
    },
    iconText: {
        marginLeft: 5,
    },

});

export default CartDetail;
