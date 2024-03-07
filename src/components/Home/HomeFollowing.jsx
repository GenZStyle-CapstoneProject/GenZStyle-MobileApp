
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Avatar, Button } from "react-native-elements";
import CartHomeFollowing from './CartHomeFollowing';
import images from '../../data/Image';
import { useNavigation } from '@react-navigation/native';

const HomeFollowing = () => {
    const navigation = useNavigation();
    const navigateToCartDetail = (item) => {

        navigation.navigate('CartDetail', { item });
    };
    const navigateToFriend = () => {

        navigation.navigate('Friends');
    };



    return (

        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={style.Container}>
                <View style={{ flex: 1, backgroundColor: 'white' }}>
                    <Text style={{ textAlign: 'center', fontWeight: 'regular', color: '#9D9FB7', marginTop: 10 }}>Khi những người bạn đang theo dõi chia sẻ trang phục của họ, bạn sẽ thấy những bộ trang phục ấy ở đây.</Text>
                </View>
                <View style={style.userContainer}>

                    <Avatar
                        activeOpacity={0.2}
                        avatarStyle={{}}
                        containerStyle={{ backgroundColor: "#BDBDBD" }}
                        icon={{}}
                        iconStyle={{}}
                        imageProps={{}}
                        onLongPress={() => alert("onLongPress")}
                        onPress={() => navigateToFriend()}
                        overlayContainerStyle={{}}
                        placeholderStyle={{}}
                        rounded
                        size="medium"
                        source={{ uri: "https://cdn.pixabay.com/photo/2023/09/16/18/26/hummingbird-8257355_1280.jpg" }}
                        title="P"
                        titleStyle={{}}
                    />
                    <View>
                        <Text style={{ fontWeight: 'bold' }}>Thien</Text>
                        <View style={style.separatorText}>
                            <Text style={{ color: '#9D9FB7' }}>170cm</Text>
                            <Text style={{ color: '#9D9FB7' }}> | </Text>
                            <Text style={{ color: '#9D9FB7' }}>12 người theo dõi</Text>
                        </View>
                    </View>
                    <View style={style.Button}>
                        <Button
                            title="Theo dõi"
                            onPress={() => Alert.alert('Right button pressed')}
                        />
                    </View>
                </View>
                <View>
                    <FlatList
                        data={images}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => <TouchableOpacity onPress={() => navigateToCartDetail(item)}>
                            <CartHomeFollowing item={item} />
                        </TouchableOpacity>}
                        numColumns={3}
                    />
                </View>
            </View>
        </View>
    );
};

const style = StyleSheet.create({
    Container: {
        padding: 20,
        paddingTop: 30,
        paddingBottom: 30
    },
    userContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: "center",
        gap: 10
    },
    Button: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 50
    },
    separatorText: {
        flexDirection: 'row',
        justifyContent: 'space-between',

    }
})


export default HomeFollowing;

