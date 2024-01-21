import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import Login from './Login';
import AuthTabNavigator from '../navigation/AuthTabNavigator/AuthTabNavigator';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import LibraryScreen from './Post/LibraryScreen';
import CameraScreen from './Post/CameraScreen';
import DraftScreen from './Post/DraftScreen';
import * as ImagePicker from 'expo-image-picker';

const Tab = createMaterialTopTabNavigator();

const PostScreen = () => {

    const navigation = useNavigation();
    const [isAuth, setIsAuth] = useState(false);
    const [libraryImages, setLibraryImages] = useState([]);

    const fetchData = async () => {
        setIsAuth(false);
    };

    // const fetchLibraryImages = async () => {
    //     try {
    //       const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
    //       if (permissionResult.granted) {
    //         const mediaLibrary = await ImagePicker.getMediaLibraryAsync();
    //         console.log('Media Library:', mediaLibrary);
    //         setLibraryImages(mediaLibrary.assets);
    //       } else {
    //         alert('Permission to access media library is required!');
    //       }
    //     } catch (error) {
    //       console.error('Error fetching library images:', error);
    //     }
    //   };

    const fetchLibraryImages = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert('Permission to access camera roll is required!');
            return;
        }

        const pickerResult = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });

        if (!pickerResult.cancelled) {
            setImage(pickerResult.uri);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        // Fetch library images when the Library tab is focused
        const unsubscribeFocus = navigation.addListener('tabPress', (e) => {
            // Check if the pressed tab is the "Thư viện" tab
            if (e.target === "Thư viện") {
                fetchLibraryImages();
            }
        });

        // Cleanup the listener when the component is unmounted
        return () => {
            unsubscribeFocus();
        };
    }, [navigation]);

    return (
        <View style={{ flex: 1 }}>
            <Tab.Navigator
                tabBarPosition="bottom"
                screenOptions={{
                    style: { backgroundColor: 'white' },
                    labelStyle: { fontSize: 24 },
                    indicatorStyle: { backgroundColor: 'black' },
                    headerStyle: { backgroundColor: 'white' },
                    tabBarIndicatorStyle: { backgroundColor: 'black' },
                }}>
                <Tab.Screen name="Thư viện">
                    {() => <LibraryScreen images={libraryImages} />}
                </Tab.Screen>
                <Tab.Screen name="Máy ảnh" component={CameraScreen} />
                <Tab.Screen name="Bản nháp" component={DraftScreen} />
            </Tab.Navigator>
        </View>
    );
};

export default PostScreen;