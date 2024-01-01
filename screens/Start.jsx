import { View, Text, Pressable, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LinearGradient } from "expo-linear-gradient";
import COLORS from '../constants/colors';
import Button from '../components/Button';

import { useFonts } from '@use-expo/font';
const Start = ({ navigation }) => {
    const [fontsLoaded] = useFonts({
        'AmitaRegular': require('../assets/fonts/Amita-Regular.ttf'),
    });

    useEffect(() => {
        console.log('Fonts Loaded:', fontsLoaded);
    }, [fontsLoaded]);


    return (
        <LinearGradient
            style={{
                flex: 1
            }}
            colors={[COLORS.white, COLORS.secondary]}
        >
            <View style={{ flex: 1 }}>
                <View>
                    <Image
                        source={require("../assets/hero1.jpg")}
                        style={{
                            height: 290,
                            width: 210,
                            borderRadius: 20,
                            position: "absolute",
                            left: 30,
                            top: 20,
                            transform: [
                                { translateX: 20 },
                                { translateY: 50 },
                                { rotate: "-12deg" }
                            ]
                        }}
                    />



                    <Image
                        source={require("../assets/hero2.jpg")}
                        style={{
                            height: 290,
                            width: 200,
                            borderRadius: 20,
                            position: "absolute",
                            top: 120,
                            left: 150,
                            transform: [
                                { translateX: 70 },
                                { translateY: 50 },
                                { rotate: "8deg" }
                            ]
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
                        fontSize: 50,
                        color: COLORS.black,
                        fontFamily: fontsLoaded ? 'AmitaRegular' : 'System',
                    }}
                    >StyleGenZ</Text>


                    <View style={{ marginVertical: 22 }}>
                        <Text style={{
                            fontSize: 16,
                            color: COLORS.black,
                            marginVertical: 4
                        }}>Bật thông báo của bạn để nhận nội dung đặc biệt từ ứng dụng</Text>

                    </View>

                    <Button
                        title="Start"
                        onPress={() => {
                            navigation.navigate("Welcome");
                        }}
                        style={{
                            marginTop: 22,
                            borderRadius: 50,
                            width: "100%",
                            backgroundColor: COLORS.white,
                            borderWidth: 0,
                        }}
                    >

                    </Button>



                </View>
            </View>
        </LinearGradient>
    )
}

export default Start