import React from 'react';
import { View, StyleSheet } from 'react-native';

const Square = () => {
    return <View style={styles.square} />;
};

const Row = () => {
    return (
        <View style={styles.row}>
            <Square />
            <Square />
            <Square />
            <Square />
        </View>
    );
};

const Cart = () => {
    return (
        <View style={styles.cart}>
            <Row />
            <Row />
        </View>
    );
};

const styles = StyleSheet.create({
    cart: {
        padding: 16,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    square: {
        width: 50,
        height: 50,
        backgroundColor: 'lightblue',
        margin: 4,
    },
});

export default Cart;
