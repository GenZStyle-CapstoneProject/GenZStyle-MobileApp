import React from 'react';
import { View, StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import HeaderFriend from '../components/Friends/HeaderFriend';
import CartFriends from '../components/Friends/CartFriends';
import products from '../data/Products';
import { useNavigation } from '@react-navigation/native';

const FriendScreen = () => {

    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <HeaderFriend />
            <View style={styles.hr} />
            {/* <CartFriends /> */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.postContainerScrollView}
                onSwipeLeft={() => navigation.goBack()}
            >
                <FlatList
                    data={products}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <TouchableOpacity>
                        <CartFriends item={item} />
                    </TouchableOpacity>}
                    numColumns={2}
                />
            </ScrollView>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    hr: {
        borderBottomColor: 'lightgray',
        borderBottomWidth: 1,
        marginTop: 20,

    },


});

export default FriendScreen;
