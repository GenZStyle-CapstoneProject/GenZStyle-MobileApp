import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import Login from './Login';
import AuthTabNavigator from '../navigation/AuthTabNavigator/AuthTabNavigator';

const PostScreen = () => {
    const navigation = useNavigation()
    const [isAuth, setIsAuth] = useState(false);
    const fetchData = async () => {
        setIsAuth(false)
    }
    useEffect(() => {
        fetchData();
    }, []);
    return isAuth === true ? (
        <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
            <Text>PostScreen</Text>
        </View>
    ) : <AuthTabNavigator />;
};

export default PostScreen;
