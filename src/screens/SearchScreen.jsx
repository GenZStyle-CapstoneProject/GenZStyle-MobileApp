import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { Searchbar, IconButton } from 'react-native-paper';
import { useFonts, Pacifico_400Regular } from '@expo-google-fonts/pacifico';
import CategoryForMen from '../components/Home/CategoryForMen';
import CategoryForWomen from '../components/Home/CategoryForWomen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation } from '@react-navigation/native';
import EveryoneScreen from './Search/EveryoneScreen';
import FashionScreen from './Search/FashionScreen';
import HashtagScreen from './Search/HashtagScreen';
import ROUTES from '../constants/routes';

const Tab = createMaterialTopTabNavigator();

const SearchScreen = () => {
    const [searchQuery, setSearchQuery] = React.useState('');
    const [showGenderOptions, setShowGenderOptions] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categoryButtonText, setCategoryButtonText] = useState('Tất cả');

    const navigation = useNavigation();

    const openGenderOptions = () => {
        setShowGenderOptions(true);
    };

    const closeGenderOptions = () => {
        setShowGenderOptions(false);
    };

    const handleCategorySelection = (category) => {
        setSelectedCategory(category);
        closeGenderOptions();
    };


    let [fontsLoaded] = useFonts({
        Pacifico_400Regular,
    });

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={style.Searchable}>
                <Searchbar
                    placeholder="Search"
                    onChangeText={setSearchQuery}
                    value={searchQuery}
                />
            </View>
            <View style={style.textContainer}>
                {fontsLoaded && (
                    <Text style={style.text}>StyleGenz</Text>
                )}
            </View>
            <View style={style.buttonContainer}>
                <Text style={{ fontSize: 30 }}>Xu hướng hàng đầu</Text>
                <IconButton
                    icon="chat"
                    color="#000"
                    // onPress={() => console.log('Chat button pressed')}
                    onPress={() => navigation.navigate(ROUTES.CONVERSATIONS)}
                />
            </View>
            <View style={{ flex: 1 }}>
                <TouchableOpacity
                    style={style.categoryButton}
                    onPress={() => setShowGenderOptions(!showGenderOptions)}
                >
                    <View style={style.rowContainer}>
                        <Text style={style.categoryButtonText}>{categoryButtonText} </Text>
                        <Icon name="chevron-down" size={25} color="black" />
                    </View>
                </TouchableOpacity>

                {showGenderOptions && (
                    <View style={style.genderOptions}>
                        <TouchableOpacity onPress={() => navigateToCategory('Nam')}>
                            <Text style={style.genderOptionText}>Nam</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigateToCategory('Nữ')}>
                            <Text style={style.genderOptionText}>Nữ</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigateToCategory('Giới tính khác')}>
                            <Text style={style.genderOptionText}>Giới tính khác</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {selectedCategory === 'Nam' && <CategoryForMen />}
                {selectedCategory === 'Nữ' && <CategoryForWomen />}

                <Tab.Navigator>
                    <Tab.Screen name="Trang phục" component={FashionScreen} />
                    <Tab.Screen name="Mọi người" component={EveryoneScreen} />
                    <Tab.Screen name="Hashtag" component={HashtagScreen} />
                </Tab.Navigator>
            </View>
            {/* <View style={style.container}>
                <View style={style.header}>
                    <TouchableOpacity
                        style={style.categoryButton}
                        onPress={() => setShowGenderOptions(!showGenderOptions)}
                    >
                        <View style={style.rowContainer}>
                            <Text style={style.categoryButtonText}>{categoryButtonText} </Text>
                            <Icon name="chevron-down" size={25} color="black" />
                        </View>
                    </TouchableOpacity>

                    {showGenderOptions && (
                        <View style={style.genderOptions}>
                            <TouchableOpacity onPress={() => navigateToCategory('Nam')}>
                                <Text style={style.genderOptionText}>Nam</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigateToCategory('Nữ')}>
                                <Text style={style.genderOptionText}>Nữ</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigateToCategory('Giới tính khác')}>
                                <Text style={style.genderOptionText}>Giới tính khác</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>

                <View style={style.tabContainer}>
                    {selectedCategory === 'Nam' && <CategoryForMen />}
                    {selectedCategory === 'Nữ' && <CategoryForWomen />}

                    <Tab.Navigator>
                        <Tab.Screen name="Trang phục" component={FashionScreen} />
                        <Tab.Screen name="Mọi người" component={EveryoneScreen} />
                        <Tab.Screen name="Hashtag" component={HashtagScreen} />
                    </Tab.Navigator>
                </View>
            </View> */}
        </View>
    );
};
const style = StyleSheet.create({
    Searchable: {
        marginTop: 40,
        elevation: 0,
        borderBottomWidth: 0
    },
    textContainer: {
        backgroundColor: '#99A1E8',
        padding: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
    },
    text: {
        fontFamily: 'Pacifico_400Regular',
        fontSize: 50,
        color: 'black',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
    categoryButton: {
        backgroundColor: 'white',
        padding: 10,
        alignSelf: 'center',
        alignSelf: 'flex-start',
    },
    categoryButtonText: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 20,
        marginRight: 10,
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    genderOptions: {
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    genderOptionText: {
        padding: 10,
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
    },
    topContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    tabNavigator: {
        flex: 1,
    },

})
export default SearchScreen;
