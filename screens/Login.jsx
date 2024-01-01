import { View, Text, Pressable, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../constants/colors';
import { useFonts } from '@use-expo/font';

const Login = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
    };
    const [fontsLoaded] = useFonts({
        'AmitaRegular': require('../assets/fonts/Amita-Regular.ttf'),
    });

    useEffect(() => {
        console.log('Fonts Loaded:', fontsLoaded);
    }, [fontsLoaded]);

    return (
        <LinearGradient
            style={{
                flex: 1,
            }}
            colors={[COLORS.white, COLORS.secondary]}
        >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View>
                    <Text
                        style={{
                            fontSize: 50,

                            color: COLORS.black,
                            fontFamily: 'AmitaRegular',
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
