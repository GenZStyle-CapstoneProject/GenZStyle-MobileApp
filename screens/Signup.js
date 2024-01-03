import { View, Text, Pressable, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../constants/colors';
import { useFonts } from '@use-expo/font';
import PhoneInput from 'react-native-phone-input';

const Signup = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);

    const handleSignup = () => {
        console.log('Username:', username);
        console.log('Phone Number:', phoneNumber);
        console.log('Password:', password);
        console.log('Confirm Password:', password2);


        const phoneNumberDigits = phoneNumber.replace(/[^0-9]/g, '');
        if (phoneNumberDigits.length !== 11) {
            alert('Số điện thoại phải có đúng 11 chữ số');
            return;
        }

        if (!username || !phoneNumber || !password || !password2) {
            alert('Vui lòng điền đầy đủ thông tin');
            return;
        }


        setTimeout(() => {
            alert('Đăng ký thành công!');
        }, 500);


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

                        />
                    </View>

                    {/* Ô nhập số điện thoại với biểu tượng */}
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
                        <Ionicons name="call" size={24} color={COLORS.grey} style={{ marginRight: 10 }} />
                        <PhoneInput
                            style={{
                                flex: 1,
                                fontSize: 16,
                            }}
                            textStyle={{ fontSize: 16 }}
                            initialCountry="vn"
                            value={phoneNumber}
                            onChangePhoneNumber={(number) => {
                                console.log('Phone Number Changed:', number);
                                setPhoneNumber(number);
                            }}
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
                            secureTextEntry={!showPassword1}
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                        />
                        <Pressable
                            onPress={() => setShowPassword1(!showPassword1)}

                        >
                            <Ionicons name={showPassword1 ? 'eye-off' : 'eye'} size={24} color={COLORS.grey} />
                        </Pressable>
                    </View>

                    {/* Ô nhập lại mật khẩu */}
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
                            placeholder="Nhập lại mật khẩu"
                            secureTextEntry={!showPassword2}
                            value={password2}
                            onChangeText={(text) => setPassword2(text)}
                        />
                        <Pressable
                            onPress={() => setShowPassword2(!showPassword2)}

                        >
                            <Ionicons name={showPassword2 ? 'eye-off' : 'eye'} size={24} color={COLORS.grey} />
                        </Pressable>
                    </View>

                    {/* Nút Đăng ký */}
                    <Pressable
                        style={{
                            backgroundColor: COLORS.white,
                            marginTop: 20,
                            paddingVertical: 15,
                            borderRadius: 50,
                            alignItems: 'center',
                        }}
                        onPress={handleSignup}
                    >
                        <Text style={{ color: COLORS.secondary, fontWeight: 'normal', fontSize: 20 }}>
                            Đăng ký
                        </Text>
                    </Pressable>

                    <Text style={{ color: COLORS.black, fontWeight: 'bold', paddingVertical: 5, alignItems: 'center', marginTop: 5, marginLeft: 10, left: 50, flexDirection: 'row' }}>
                        Bạn đã có tài khoản?
                        <Text onPress={() => { navigation.navigate('Login'); }} style={{ color: 'rgb(122, 92, 241)', fontWeight: 'bold', marginLeft: 5 }}>
                            Đăng nhập tại đây
                        </Text>
                    </Text>
                </View>
            </View>
        </LinearGradient>
    );
};

export default Signup;
