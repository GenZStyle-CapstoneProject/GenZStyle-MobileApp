import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import LibraryScreen from './Post/LibraryScreen';
import CameraScreen from './Post/CameraScreen';
import DraftScreen from './Post/DraftScreen';
import AuthTabNavigator from '../navigation/AuthTabNavigator/AuthTabNavigator';

const Tab = createMaterialTopTabNavigator();

const PostScreen = () => {
    const navigation = useNavigation();

    const [isAuth, setIsAuth] = useState(false);
    const fetchData = async () => {
        setIsAuth(false)
    }
    useEffect(() => {
        fetchData();
    }, []);
    //     return isAuth === true ? (
    //         <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
    //             <Text>PostScreen</Text>
    //         </View>
    //     ) : <AuthTabNavigator />;
    // };

    return isAuth === true ? (
        <View style={{ flex: 1 }}>
            <Tab.Navigator
                tabBarPosition="bottom"
                screenOptions={{
                    style: { backgroundColor: 'white' },
                    labelStyle: { fontSize: 24 },
                    indicatorStyle: { backgroundColor: 'black' },
                    headerStyle: { backgroundColor: 'white' },
                    tabBarIndicatorStyle: { backgroundColor: 'black' },
                }}
            >
                <Tab.Screen name="Thư viện" component={LibraryScreen} />
                <Tab.Screen name="Máy ảnh" component={CameraScreen} />
                <Tab.Screen name="Bản nháp" component={DraftScreen} />
            </Tab.Navigator>
        </View>
    ) : <AuthTabNavigator />;
};

export default PostScreen;