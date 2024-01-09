import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // Import AntDesign icon library

const MyClothesScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.buttonRow}>
                {/* Add New Product Button */}
                <View style={[styles.buttonFrame, styles.widerButton, styles.grayFrame]}>
                    <TouchableOpacity style={styles.addButton}>
                        <Text style={styles.addButtonText}>Thêm sản phẩm mới</Text>
                    </TouchableOpacity>
                </View>

                {/* Trash Bin Icon */}
                <View style={[styles.buttonFrame, styles.smallerButton, styles.grayFrame]}>
                    <TouchableOpacity style={styles.trashButton}>
                        <AntDesign name="delete" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
            <Text style={styles.noProductsText}>Không có sản phẩm có sẵn</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    buttonRow: {
        flexDirection: 'row',
        marginTop: 20,
    },
    buttonFrame: {
        flex: 1,
        borderWidth: 2,

        marginHorizontal: 10,
        overflow: 'hidden',
    },
    widerButton: {
        flex: 2,
    },
    smallerButton: {
        flex: 0.3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    grayFrame: {
        borderColor: 'gray',
    },
    addButton: {
        backgroundColor: 'white',
        padding: 10,

    },
    addButtonText: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 15,
    },
    trashButton: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
    },
    noProductsText: {
        fontSize: 18,
        color: 'gray',
        textAlign: 'center',
        marginTop: 50,

    },
});

export default MyClothesScreen;
