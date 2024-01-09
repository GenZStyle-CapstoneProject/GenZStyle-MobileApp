
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CategoryForWomen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Danh mục cho Nữ</Text>
            {/* Thêm các phần tử và logic cho danh mục nữ tại đây */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default CategoryForWomen;
