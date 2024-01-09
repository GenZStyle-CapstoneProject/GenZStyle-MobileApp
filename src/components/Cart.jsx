import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const Cart = ({ item }) => (

    <View style={styles.postContainer}>
        <Image source={{ uri: item.image }} style={styles.postImage} />
        <View style={styles.postFooter}>

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
            <View style={styles.textContainer}>
                <View style={styles.textRow}>
                    <Text style={styles.titleText}>Denisa  Elena Aboaice</Text>
                </View>
                <View style={styles.textRow}>
                    <Text style={styles.hashtagText}>{item.hashtag}</Text>
                </View>
            </View>


        </View>
    </View>
);



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