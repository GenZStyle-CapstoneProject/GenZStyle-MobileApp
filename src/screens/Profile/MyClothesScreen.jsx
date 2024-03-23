
// import React, { useEffect } from 'react';
// import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchListSave } from '../../app/ListSave/action';

// const MyClothesScreen = () => {
//     const dispatch = useDispatch();
//     const { list } = useSelector((state) => state.listSave);

//     useEffect(() => {
//         dispatch(fetchListSave());
//     }, [dispatch]);

//     return (
//         <View style={styles.container}>
//             <FlatList
//                 data={list.data}
//                 keyExtractor={(item) => item.id.toString()}
//                 renderItem={({ item }) => (
//                     <View style={styles.postItem}>
//                         <Image source={{ uri: item.image_url }} style={styles.image} />
//                         <View style={styles.postFooter}>
//                             <Text style={styles.name}>{item.name}</Text>
//                         </View>
//                     </View>
//                 )}
//                 numColumns={2}
//                 columnWrapperStyle={styles.columnWrapperStyle}
//                 contentContainerStyle={styles.contentContainer}
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: 'white',
//     },
//     postItem: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         padding: 10,
//         width: '50%',
//     },
//     image: {
//         width: '100%',
//         height: 150,
//         resizeMode: 'cover',
//         marginBottom: 10,
//         borderRadius: 8,
//     },
//     postFooter: {
//         flexDirection: 'column',

//     },
//     name: {
//         fontSize: 16,
//         fontWeight: "bold",
//         color: "#333333",

//     },
//     columnWrapperStyle: {
//         justifyContent: 'space-between',
//         paddingHorizontal: 10,
//     },
//     contentContainer: {
//         paddingHorizontal: 10,
//     },
// });

// export default MyClothesScreen;

import React, { useEffect, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, Image, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchListSave } from '../../app/ListSave/action';
import { useFocusEffect } from '@react-navigation/native';

const MyClothesScreen = () => {
    const dispatch = useDispatch();
    const { list } = useSelector((state) => state.listSave);

    const fetchListSaveCallback = useCallback(() => {
        dispatch(fetchListSave());
    }, [dispatch]);

    useFocusEffect(fetchListSaveCallback);

    useEffect(() => {
        fetchListSaveCallback();
    }, [fetchListSaveCallback]);

    return (
        <View style={styles.container}>
            <FlatList
                data={list.data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.postItem}>
                        <Image source={{ uri: item.image_url }} style={styles.image} />
                        <View style={styles.postFooter}>
                            <Text style={styles.name}>{item.name}</Text>
                        </View>
                    </View>
                )}
                numColumns={2}
                columnWrapperStyle={styles.columnWrapperStyle}
                contentContainerStyle={styles.contentContainer}
            />
        </View>
    );
};

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    postItem: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 8,
        width: windowWidth / 2 - 15, // 15 là tổng padding và margin theo chiều ngang
        marginBottom: 16,
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        borderRadius: 8,
        marginBottom: 10
    },
    postFooter: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        // marginLeft: 20,
        padding: 8,
        backgroundColor: "#f9f9f9",
        borderRadius: 8,
    },
    name: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333333",
    },
    columnWrapperStyle: {
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    contentContainer: {
        paddingHorizontal: 5,
    },
});

export default MyClothesScreen;
