import { View, Text, Pressable, Image, Linking } from 'react-native'
import React from 'react'
import { LinearGradient } from "expo-linear-gradient";
import COLORS from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';

import * as GoogleSignIn from 'expo-google-app-auth';
const Welcome = ({ navigation }) => {

    const handleGoogleLogin = async () => {
        try {
            const { type, accessToken, user } = await GoogleSignIn.logInAsync({

                androidClientId: '480442253942-kn791oae3hf8jfgue8v7hmqeja6i3ct1.apps.googleusercontent.com',
                scopes: ['profile', 'email'],
            });

            if (type === 'success') {
                // Successfully signed in
                console.log('Access Token:', accessToken);
                console.log('User:', user);
            }
        } catch (error) {
            console.error('Google Sign-In Error:', error);
        }
    };

    return (
        <LinearGradient
            style={{
                flex: 1
            }}
            colors={[COLORS.white, COLORS.white]}
        >
            <View style={{ flex: 1 }}>
                <View>
                    <Image
                        source={require("../assets/welcome.jpg")}
                        style={{
                            height: 400,
                            width: 410,
                            position: "absolute",
                            top: 50,
                        }}
                    />
                </View>

                {/* content  */}

                <View style={{
                    paddingHorizontal: 42,
                    position: "absolute",
                    top: 500,
                    width: "100%"
                }}>
                    <Text style={{
                        fontSize: 40,
                        fontWeight: 800,
                        color: COLORS.black
                    }}>Welcome</Text>

                    {/* Nút Đăng Nhập Bằng Gmail */}
                    <Pressable
                        style={{
                            backgroundColor: COLORS.white,
                            paddingVertical: 12,
                            borderRadius: 8,
                            alignItems: 'center',
                            marginBottom: 12,
                            marginTop: 30,
                            flexDirection: 'row',
                            borderColor: COLORS.black,
                            borderWidth: 2,
                        }}
                        onPress={handleGoogleLogin}
                    >
                        {/* Icon Gmail */}
                        <Ionicons name="logo-google" size={24} color={COLORS.black} style={{ marginRight: 50, marginLeft: 20 }} />
                        <Text style={{ color: COLORS.black, fontWeight: 'bold' }}>Đăng nhập bằng Gmail</Text>
                    </Pressable>

                    {/* Nút Đăng Nhập  */}
                    <Pressable
                        style={{
                            backgroundColor: COLORS.white,
                            paddingVertical: 12,
                            borderRadius: 8,
                            alignItems: 'center',
                            borderColor: COLORS.black,
                            borderWidth: 2,
                        }}
                        onPress={() => {
                            navigation.navigate("Login");
                        }}
                    >
                        <Text style={{ color: COLORS.black, fontWeight: 'bold' }}>Đăng nhập</Text>
                    </Pressable>
                    <Pressable
                        style={{
                            backgroundColor: COLORS.secondary,
                            paddingVertical: 12,
                            borderRadius: 20,
                            alignItems: 'center',
                            marginTop: 12,
                            width: '50%',
                            left: 80,
                        }}
                        onPress={() => {
                            navigation.navigate("Signup");
                        }}
                    >
                        <Text style={{ color: COLORS.black, fontWeight: 'bold' }}>Đăng ký </Text>
                    </Pressable>

                    <Text style={{
                        color: COLORS.secondary, fontWeight: 'bold',
                        paddingVertical: 5,
                        borderRadius: 8,
                        alignItems: 'center',
                        marginTop: 5,
                        left: 100,
                    }}>Không phải bây giờ </Text>
                </View>
            </View>
        </LinearGradient>
    )
}

export default Welcome;
