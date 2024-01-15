import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, FlatList, Linking, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import products from '../data/Products';
import Cart from '../components/Home/Cart'
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
        <ScrollView style={styles.container}>
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

            {/* Link sản phẩm */}
            <Text style={styles.linkSPText} >
                Link sản phẩm:
            </Text>
            <Text style={styles.linkText} onPress={() => Linking.openURL('https://www.fptshop.com')}>
                www.fptshop.com
            </Text>

            {/* Các sản phẩm liên quan */}
            <View style={styles.relatedProductsContainer}>
                <Text style={styles.relatedProductsTitle}>Các sản phẩm liên quan:</Text>
                {/* Hiển thị danh sách sản phẩm liên quan */}
                {/* <FlatList
                    data={products}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity >
                            <Image source={{ uri: item.image }} style={styles.relatedProductImage} />
                        </TouchableOpacity>
                    )}

                    numColumns={2}
                    showsHorizontalScrollIndicator={false}
                /> */}
                <FlatList
                    data={products}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <TouchableOpacity onPress={() => navigateToCartDetail(item)}>
                        <Cart item={item} />
                    </TouchableOpacity>}
                    numColumns={2}
                />
            </View>



        </ScrollView>
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
    linkText: {
        color: 'blue',
        marginTop: 10,
        marginBottom: 10,
        fontSize: 16,
        textDecorationLine: 'underline',
    },
    linkSPText: {
        color: 'black',
        marginTop: 20,
        marginBottom: 10,
        fontSize: 16,
        // textDecorationLine: 'underline',
    },

    relatedProductsContainer: {
        marginTop: 20,
    },

    relatedProductsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },



});

export default CartDetail;
