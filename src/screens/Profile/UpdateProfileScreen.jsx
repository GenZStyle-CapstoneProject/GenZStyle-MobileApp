import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Modal, TouchableWithoutFeedback } from 'react-native'; import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const UpdateProfileScreen = () => {
    const navigation = useNavigation();

    const handleGoBack = () => {
        navigation.goBack();
    };

    const handleChangeAvatar = () => {

    };
    const [genderModalVisible, setGenderModalVisible] = useState(false);
    const [selectedGender, setSelectedGender] = useState('Nam');

    const genderOptions = ['Nam', 'Nữ', 'Khác'];

    const handleGenderSelect = (gender) => {
        setSelectedGender(gender);
        setGenderModalVisible(false);
    };
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={handleGoBack} style={styles.headerBack}>
                    <Icon name="keyboard-arrow-left" size={30} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Chỉnh sửa hồ sơ</Text>
                <TouchableOpacity style={styles.headerSave}>
                    <Text style={styles.headerSaveText}>Hoàn tất</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.avatarContainer}>

                <Image
                    source={require('../../../assets/avatar.jpg')}
                    style={styles.profileImage}
                />

                <TouchableOpacity onPress={handleChangeAvatar} style={styles.changeAvatarButton}>
                    <Text style={styles.changeAvatarText}>Thay đổi hình ảnh</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
                {/* Họ và tên */}
                <TextInput style={styles.input} placeholder=" Họ và tên" />

                {/* Ngày sinh */}
                <TextInput style={styles.input} placeholder="Ngày sinh" />

                {/* Số điện thoại */}
                <TextInput style={styles.input} placeholder="Nhập số điện thoại" />

                <View style={styles.rowContainer}>
                    {/* Chiều cao */}
                    <TextInput style={styles.halfInput} placeholder="Nhập chiều cao" />

                    {/* Giới tính */}
                    <View style={styles.rowContainer}>
                        <Text style={styles.genderLabel}>Giới tính</Text>
                        <TouchableOpacity onPress={() => setGenderModalVisible(true)}>
                            <Text style={styles.genderText}>{selectedGender}</Text>
                        </TouchableOpacity>
                    </View>

                    <Modal
                        transparent={true}
                        animationType="slide"
                        visible={genderModalVisible}
                        onRequestClose={() => setGenderModalVisible(false)}
                    >
                        <TouchableWithoutFeedback onPress={() => setGenderModalVisible(false)}>
                            <View style={styles.modalOverlay} />
                        </TouchableWithoutFeedback>
                        <View style={styles.genderModal}>
                            {genderOptions.map((gender) => (
                                <TouchableOpacity
                                    key={gender}
                                    style={styles.genderOption}
                                    onPress={() => handleGenderSelect(gender)}
                                >
                                    <Text>{gender}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </Modal>
                </View>

                {/* Thành phố/Tỉnh */}
                <TextInput style={styles.input} placeholder="Nhập thành phố/tỉnh" />

                {/* Địa chỉ */}
                <TextInput style={styles.input} placeholder="Nhập địa chỉ" />
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        paddingTop: 50,
        backgroundColor: 'white',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 15,
    },
    headerBack: {
        right: 20,
    },
    headerTitle: {
        flex: 1,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
    avatarContainer: {
        marginRight: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    changeAvatarButton: {
        marginTop: 20,
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'gray',
    },
    changeAvatarText: {
        color: 'black',
        fontSize: 16,
    },
    headerSave: {
        marginLeft: 10,
    },
    headerSaveText: {
        fontSize: 16,
        color: 'gray',
    },
    inputContainer: {

        marginTop: 35,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    halfInput: {
        flex: 1,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        marginRight: 5,
        marginBottom: 20,
    },
    genderLabel: {
        flex: 1,
        fontSize: 16,
        marginRight: 10,
        color: 'black',
    },
    genderText: {
        fontSize: 16,
        color: 'black',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    genderModal: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    genderOption: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
    },
});

export default UpdateProfileScreen;
