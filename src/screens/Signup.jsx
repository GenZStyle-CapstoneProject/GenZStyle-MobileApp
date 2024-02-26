import { View, Text, Pressable, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../constants/colors';
import { useFonts } from '@use-expo/font';
import PhoneInput from 'react-native-phone-input';
import { FontAwesome } from '@expo/vector-icons';
// import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';

const Signup = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [passwordHash, setPasswordHash] = useState('');
    const [password2, setPassword2] = useState('');
    const [phone, setPhone] = useState('');
    const [showPassword1, setShowPassword1] = useState(false);
    // const [showPassword2, setShowPassword2] = useState(false);
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState('');
    // const [showDatePicker, setShowDatePicker] = useState(false);
    // const [selectedDate, setSelectedDate] = useState(new Date());


    const handleSignup = async () => {
        try {
            const phoneDigits = phone.replace(/[^0-9]/g, '');
            if (phoneDigits.length !== 11) {
                alert('Số điện thoại phải có đúng 11 chữ số');
                return;
            }

            if (!username || !phone || !passwordHash || !email || !dob) {
                alert('Vui lòng điền đầy đủ thông tin');
                return;
            }

            const data = {
                UserName: username,
                PasswordHash: passwordHash,
                Phone: phone,
                Email: email,
                Dob: dob,
            };

            const response = await axios.post('https://genzstyleappapi20240126141439.azurewebsites.net/api/Users/Post/odata/Users/Register', data, {
                headers: {
                    'Content-Type': 'application/json',
                    // Add any other headers if needed
                },
            });

            if (response.status === 200) {
                alert('Đăng ký thành công!');
                navigation.navigate('MoreInfo');
            } else {
                alert('Đăng ký không thành công. Vui lòng thử lại.');
            }
        } catch (error) {
            console.error('Error during signup:', error);
            if (error.response) {
                console.error('Server responded with:', error.response.data);
                console.error('Status code:', error.response.status);
                alert('Server responded with an error. Please check the console for details.');
            } else if (error.request) {
                console.error('No response received:', error.request);
                alert('No response received from the server. Please check your network connection.');
            } else {
                console.error('Error setting up the request:', error.message);
                alert('An error occurred during the request setup. Please check the console for details.');
            }
        }
    };

    // const [fontsLoaded] = useFonts({
    //     'AmitaRegular': require('../assets/fonts/Amita-Regular.ttf'),
    // });

    // useEffect(() => {
    //     console.log('Fonts Loaded:', fontsLoaded);
    // }, [fontsLoaded]);

    // const handleDateChange = (event, date) => {
    //     if (Platform.OS === 'android') {
    //         setShowDatePicker(false);
    //     }
    //     if (date) {
    //         setSelectedDate(date);
    //         const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    //         setDob(formattedDate);
    //     }
    // };

    // const showDatepicker = () => {
    //     setShowDatePicker(true);
    // };

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
                            required={true}
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
                            value={phone}
                            onChangePhoneNumber={(number) => {
                                console.log('Phone Number Changed:', number);
                                setPhone(number);
                            }}
                            required={true}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, paddingVertical: 10, borderRadius: 50, marginBottom: 12, paddingHorizontal: 10 }}>
                        <Ionicons name="mail" size={24} color={COLORS.grey} style={{ marginRight: 10 }} />
                        <TextInput
                            style={{ flex: 1, fontSize: 16 }}
                            placeholder="Email"
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                            required={true}
                        />
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, paddingVertical: 10, borderRadius: 50, marginBottom: 12, paddingHorizontal: 10 }}>
                        <FontAwesome name="birthday-cake" size={24} color={COLORS.grey} style={{ marginRight: 10 }} />
                        <TextInput
                            style={{ flex: 1, fontSize: 16 }}
                            placeholder="Ngày sinh"
                            value={dob}
                            onChangeText={(text) => setDob(text)}
                            required={true}
                        />
                        {/* <Pressable onPress={showDatepicker} style={{ flex: 1, alignItems: 'flex-end' }}>
                            <FontAwesome name="calendar" size={24} color={COLORS.grey} style={{ marginRight: 10 }} />
                        </Pressable>
                        {showDatePicker && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={selectedDate}
                                mode="date"
                                is24Hour={true}
                                display="default"
                                onChange={handleDateChange}
                            />
                        )} */}

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
                            value={passwordHash}
                            onChangeText={(text) => setPasswordHash(text)}
                            required={true}
                        />
                        <Pressable
                            onPress={() => setShowPassword1(!showPassword1)}

                        >
                            <Ionicons name={showPassword1 ? 'eye-off' : 'eye'} size={24} color={COLORS.grey} />
                        </Pressable>
                    </View>

                    {/* Ô nhập lại mật khẩu */}
                    {/* <View
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
                    </View> */}

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
