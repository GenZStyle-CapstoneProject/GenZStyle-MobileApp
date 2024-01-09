
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Avatar, Button } from "react-native-elements";
import Cart from './CartHomeFollowing';
import images from '../../data/Image';



const HeaderHomeFollowing = () => (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Text style={{ textAlign: 'center', fontWeight: 'regular', color: '#9D9FB7', marginTop: 10 }}>Khi những người bạn đang theo dõi chia sẻ trang phục của họ, bạn sẽ thấy những bộ trang phục ấy ở đây.</Text>
    </View>
);

const style = StyleSheet.create({
})


export default HeaderHomeFollowing;

