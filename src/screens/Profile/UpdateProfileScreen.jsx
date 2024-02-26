// import React, { useEffect, useState } from 'react'
// import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, TextInput, Modal, TouchableWithoutFeedback, Alert } from 'react-native'; import Icon from 'react-native-vector-icons/MaterialIcons';
// import { useNavigation } from '@react-navigation/native';
// import { useFonts, Pacifico_400Regular } from '@expo-google-fonts/pacifico';
// import * as ImagePicker from 'expo-image-picker';
// import axios from 'axios';
// import { useRoute } from '@react-navigation/native';
// const UpdateProfileScreen = () => {
//     const route = useRoute();
//     // const key = route.params?.accountId;
//     const [userInfo, setUserInfo] = useState({
//         ...route.params?.userInfo,
//         gender: route.params?.userInfo.gender === true ? 'Nam' : 'Nữ',
//         dob: route.params?.userInfo.dob || '',
//         address: route.params?.userInfo.address || '',
//         phone: route.params?.userInfo.phone || '',
//         // accountId: key,
//     });


//     console.log("userInfo in UpdateProfile: ", userInfo);
//     const navigation = useNavigation();



//     useEffect(() => {
//         console.log("userInfo in Updateprofile: ", userInfo);
//     }, [userInfo]);









//     const updateProfile = async (userInfo) => {
//         try {
//             const { fullName, dob, phone, height, city, address, gender } = userInfo;

//             console.log("userInfo before update:", { fullName, dob, phone, height, city, address, gender });

//             if (!address || !city || !phone || !gender) {
//                 console.error("Please provide all required information (Address, City, Phone , Gender)");
//                 return;
//             }

//             const response = await axios.put(
//                 `https://genzstyleappapi20240126141439.azurewebsites.net/api/Users/Put/User/{key}/UpdateUser`,
//                 { fullName, dob, phone, height, city, address, gender }
//             );


//             console.log(response.data);
//         } catch (error) {
//             if (error.response && error.response.status === 400 && error.response.data && error.response.data.errors) {
//                 // Handle validation errors here
//                 const validationErrors = error.response.data.errors;
//                 console.error('Validation Errors:', validationErrors);
//                 // Display error messages to the user
//             } else {
//                 // Handle other types of errors
//                 console.error('AxiosError:', error.message);
//             }
//         }
//     };


//     const handleGoBack = () => {
//         navigation.goBack();
//     };

//     let [fontsLoaded] = useFonts({
//         Pacifico_400Regular,
//     });
//     const handleChangeAvatar = async () => {
//         Alert.alert(
//             'Chọn hình ảnh',
//             'Bạn muốn chọn hình ảnh từ đâu?',
//             [
//                 {
//                     text: 'Hủy',
//                     style: 'cancel',
//                 },
//                 {
//                     text: 'Camera',
//                     onPress: () => pickImageFromCamera(),
//                 },
//                 {
//                     text: 'Thư viện',
//                     onPress: () => pickImageFromLibrary(),
//                 },
//             ],
//             { cancelable: false }
//         );
//     };


//     const pickImageFromCamera = async () => {
//         const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

//         if (permissionResult.granted === false) {
//             alert('Permission to access the camera is required!');
//             return;
//         }

//         const pickerResult = await ImagePicker.launchCameraAsync({
//             allowsEditing: true,
//             aspect: [4, 3],
//         });

//         if (!pickerResult.cancelled) {
//             setImage(pickerResult.uri);
//         }
//     };

//     const pickImageFromLibrary = async () => {
//         const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

//         if (permissionResult.granted === false) {
//             alert('Permission to access camera roll is required!');
//             return;
//         }

//         const pickerResult = await ImagePicker.launchImageLibraryAsync({
//             allowsEditing: true,
//             aspect: [4, 3],
//         });

//         if (!pickerResult.cancelled) {
//             setImage(pickerResult.uri);
//         }
//     };
//     const [genderModalVisible, setGenderModalVisible] = useState(false);
//     const [selectedGender, setSelectedGender] = useState('Nam');

//     const genderOptions = ['Nam', 'Nữ', 'Khác'];

//     const handleGenderSelect = (gender) => {
//         setUserInfo({ ...userInfo, gender });
//         setGenderModalVisible(false);
//     };
//     return (

//         <ScrollView style={styles.container}>
//             <View style={styles.headerContainer}>
//                 <TouchableOpacity onPress={handleGoBack} style={styles.headerBack}>
//                     <Icon name="keyboard-arrow-left" size={30} color="black" />
//                 </TouchableOpacity>
//                 <Text style={styles.headerTitle}>Chỉnh sửa hồ sơ</Text>
//                 <TouchableOpacity
//                     style={styles.headerSave}
//                     onPress={() => updateProfile(userInfo)}
//                 >
//                     <Text style={styles.headerSaveText}>Hoàn tất</Text>
//                 </TouchableOpacity>
//             </View>

//             <View style={styles.avatarContainer}>

//                 <Image
//                     source={require('../../../assets/avatar.jpg')}
//                     style={styles.profileImage}
//                 />

//                 <TouchableOpacity onPress={handleChangeAvatar} style={styles.changeAvatarButton}>
//                     <Text style={styles.changeAvatarText}>Thay đổi hình ảnh</Text>
//                 </TouchableOpacity>
//             </View>

//             <View style={styles.inputContainer}>
//                 {/* Họ và tên */}
//                 <TextInput
//                     style={styles.input}
//                     placeholder=" Họ và tên"
//                     value={userInfo.fullName}
//                     onChangeText={(text) => setUserInfo({ ...userInfo, fullName: text })}
//                 />

//                 {/* Ngày sinh */}
//                 {/* <TextInput style={styles.input} placeholder="Ngày sinh" value={userInfo.dob} onChangeText={(text) => setUserInfo({ ...userInfo, dob: text })} /> */}
//                 <TextInput style={styles.input} placeholder="Ngày sinh" value={userInfo.dob} onChangeText={(text) => setUserInfo({ ...userInfo, dob: text })} />
//                 {/* Số điện thoại */}
//                 <TextInput style={styles.input} placeholder="Nhập số điện thoại" value={userInfo.phone} onChangeText={(text) => setUserInfo({ ...userInfo, phone: text })} />

//                 <View style={styles.rowContainer}>
//                     {/* Chiều cao */}
//                     <TextInput style={styles.halfInput} placeholder="Nhập chiều cao" value={userInfo.height} onChangeText={(text) => setUserInfo({ ...userInfo, height: text })} />


//                     <View style={styles.rowContainer}>
//                         <Text style={styles.genderLabel}>Giới tính</Text>
//                         <TouchableOpacity onPress={() => setGenderModalVisible(true)}>
//                             <Text style={styles.genderText}>{userInfo.gender}</Text>
//                         </TouchableOpacity>
//                     </View>

//                     <Modal
//                         transparent={true}
//                         animationType="slide"
//                         visible={genderModalVisible}
//                         onRequestClose={() => setGenderModalVisible(false)}
//                     >

//                         <View style={styles.genderModal}>
//                             {genderOptions.map((gender) => (
//                                 <TouchableOpacity
//                                     key={gender}
//                                     style={styles.genderOption}
//                                     onPress={() => handleGenderSelect(gender)}
//                                 >
//                                     <Text>{gender}</Text>
//                                 </TouchableOpacity>
//                             ))}
//                         </View>
//                     </Modal>
//                 </View>

//                 {/* Thành phố/Tỉnh */}
//                 <TextInput style={styles.input} placeholder="Nhập thành phố/tỉnh" value={userInfo.city} onChangeText={(text) => setUserInfo({ ...userInfo, city: text })} />

//                 {/* Địa chỉ */}
//                 <TextInput style={styles.input} placeholder="Nhập địa chỉ" value={userInfo.address} onChangeText={(text) => setUserInfo({ ...userInfo, address: text })} />

//             </View>
//             <View style={styles.textContainer}>
//                 {fontsLoaded && (
//                     <Text style={styles.text}>StyleGenz</Text>
//                 )}
//             </View>

//         </ScrollView>


//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         paddingHorizontal: 10,
//         paddingTop: 50,
//         backgroundColor: 'white',
//     },
//     headerContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'center',
//         marginLeft: 15,
//     },
//     headerBack: {
//         right: 20,
//     },
//     headerTitle: {
//         flex: 1,
//         textAlign: 'center',
//         fontSize: 18,
//         fontWeight: 'bold',
//     },
//     avatarContainer: {
//         marginRight: 20,
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginTop: 20,
//     },
//     profileImage: {
//         width: 80,
//         height: 80,
//         borderRadius: 40,
//     },
//     changeAvatarButton: {
//         marginTop: 20,
//         backgroundColor: 'white',
//         paddingVertical: 10,
//         paddingHorizontal: 20,
//         borderRadius: 5,
//         borderWidth: 1,
//         borderColor: 'gray',
//     },
//     changeAvatarText: {
//         color: 'black',
//         fontSize: 16,
//     },
//     headerSave: {
//         marginLeft: 10,
//     },
//     headerSaveText: {
//         fontSize: 16,
//         color: 'gray',
//     },
//     inputContainer: {

//         marginTop: 35,
//     },
//     input: {
//         height: 40,
//         borderColor: 'gray',
//         borderWidth: 1,
//         marginBottom: 20,
//         paddingHorizontal: 10,
//     },
//     rowContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//     },
//     halfInput: {
//         flex: 1,
//         height: 40,
//         borderColor: 'gray',
//         borderWidth: 1,
//         paddingHorizontal: 10,
//         marginRight: 5,
//         marginBottom: 20,
//     },
//     genderLabel: {
//         flex: 1,
//         fontSize: 16,
//         marginRight: 10,
//         color: 'black',
//     },
//     genderText: {
//         fontSize: 16,
//         color: 'black',
//     },
//     modalOverlay: {
//         flex: 1,
//         backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     },
//     genderModal: {
//         position: 'absolute',
//         bottom: 0,
//         left: 0,
//         right: 0,
//         backgroundColor: 'white',
//         padding: 20,
//         borderTopLeftRadius: 10,
//         borderTopRightRadius: 10,
//     },
//     genderOption: {
//         paddingVertical: 10,
//         borderBottomWidth: 1,
//         borderBottomColor: 'lightgray',
//     },
//     textContainer: {
//         backgroundColor: '#99A1E8',
//         padding: 25,
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginTop: 15,
//     },
//     text: {
//         fontFamily: 'Pacifico_400Regular',
//         fontSize: 50,
//         color: 'black',
//     },
// });

// export default UpdateProfileScreen;
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { updateProfile } from '../../features/userSlice';

const UpdateProfileScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const dispatch = useDispatch();

    const userInfo = route.params?.userInfo;

    const [newUsername, setNewUsername] = useState(userInfo?.username || '');
    const [newHeight, setNewHeight] = useState(userInfo?.data?.height?.toString() || '');

    const handleSave = () => {
        // Update the profile with the new username and height
        dispatch(
            updateProfile({
                accountId: userInfo.accountId,
                username: newUsername,
                height: newHeight,
            })
        );

        // Navigate back to the profile screen
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Username</Text>
            <TextInput
                style={styles.input}
                value={newUsername}
                onChangeText={setNewUsername}
                placeholder={`Current: ${userInfo?.username || ''}`}
            />

            <Text style={styles.label}>Height (cm)</Text>
            <TextInput
                style={styles.input}
                value={newHeight}
                onChangeText={setNewHeight}
                placeholder={`Current: ${userInfo?.data?.height?.toString() || ''}`}
                keyboardType="numeric"
            />

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    label: {
        fontSize: 18,
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    saveButton: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    saveButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default UpdateProfileScreen;

