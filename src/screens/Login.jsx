import { View, Text, Pressable, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../constants/colors';
import { useFonts } from '@use-expo/font';
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Spinner from "react-native-loading-spinner-overlay";
import { login } from "../features/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ navigation }) => {

    // const handleLogin = () => {
    //     navigation.navigate("HomeScreen");
    // };
    // const [fontsLoaded] = useFonts({
    //     'AmitaRegular': require('../assets/fonts/Amita-Regular.ttf'),
    // });

    // useEffect(() => {
    //     console.log('Fonts Loaded:', fontsLoaded);
    // }, [fontsLoaded]);
    const dispatch = useAppDispatch();


    const isLoading = useAppSelector((state) => state.product.loading);


    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    const handleLogin = async () => {
        try {
            console.log("username: " + username, "password: " + password);
            await dispatch(login({ userName: username, passwordHash: password })).then(
                (res) => {
                    console.log(JSON.stringify(res.meta.requestStatus, null, 2));
                    if (res?.meta?.requestStatus === "fulfilled") {
                        alert("Dang nhap thanh cong")
                    } else {
                        alert("Dang nhap that bai")

                    }
                }
            );
        } catch (error) {
            console.log(error);
        }
    };
    const getAccessToken = async () => {
        const accessToken = await AsyncStorage.getItem("ACCESS_TOKEN");
        console.log("AccessToken: " + "<< " + accessToken + " >>");
    };

    useEffect(() => {
        getAccessToken();
    }, [getAccessToken]);


    return (
        <LinearGradient
            style={{
                flex: 1,
            }}
            colors={[COLORS.white, COLORS.secondary]}
        >
            <Spinner visible={isLoading} />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View>
                    <Text
                        style={{
                            fontSize: 50,

                            color: COLORS.black,
                            // fontFamily: 'AmitaRegular',
                        }}
                    >
                        StyleGenZ
                    </Text>
                </View>

                {/* content */}
                <View
                    style={{
                        paddingHorizontal: 42,
                        width: '100%',
                    }}
                >
                    {/* Ô nhập tài khoản */}
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: COLORS.white,
                            paddingVertical: 10,
                            borderRadius: 50,
                            marginBottom: 12,
                            marginTop: 100,
                            paddingHorizontal: 10,
                        }}
                    >
                        <Ionicons name="person" size={24} color={COLORS.grey} style={{ marginRight: 10 }} />
                        <TextInput
                            style={{
                                flex: 1,
                                fontSize: 16,
                            }}
                            placeholder="Tên tài khoản"
                            value={username}
                            onChangeText={(text) => setUsername(text)}
                        />
                    </View>

                    {/* Ô nhập mật khẩu */}
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: COLORS.white,
                            paddingVertical: 10,
                            borderRadius: 50,
                            marginBottom: 12,
                            paddingHorizontal: 10,
                        }}
                    >
                        <Ionicons name="lock-closed" size={24} color={COLORS.grey} style={{ marginRight: 10 }} />
                        <TextInput
                            style={{
                                flex: 1,
                                fontSize: 16,
                            }}
                            placeholder="Mật khẩu"
                            secureTextEntry={true}
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                        />
                    </View>

                    {/* Nút Đăng Nhập */}
                    <Pressable
                        style={{
                            backgroundColor: COLORS.white,
                            marginTop: 20,
                            paddingVertical: 15,
                            borderRadius: 50,
                            alignItems: 'center',

                        }}
                        onPress={handleLogin}
                    >
                        <Text style={{ color: COLORS.secondary, fontWeight: 'normal', fontSize: 20 }}>
                            Đăng nhập
                        </Text>
                    </Pressable>

                    <Text
                        style={{
                            color: COLORS.black,
                            fontWeight: 'bold',
                            paddingVertical: 5,

                            alignItems: 'center',
                            marginTop: 5,
                            marginLeft: 10,
                            left: 90,
                        }}
                        onPress={() => {

                            navigation.navigate("Signup");
                        }}
                    >
                        Bạn chưa có tài khoản?
                    </Text>
                </View>
            </View>
        </LinearGradient>
    );
};

export default Login;
