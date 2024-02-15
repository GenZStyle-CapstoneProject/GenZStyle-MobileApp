import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput, Modal, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { Alert } from 'react-native';
import ROUTES from '../../constants/routes';

const UpPostScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();

    const goBack = () => {
        navigation.goBack();
    };

    // Lấy thông tin ảnh được chọn từ đường dẫn
    const selectedImage = route.params?.selectedImage;

    // State để lưu nội dung nhập vào ô input
    const [inputText, setInputText] = useState('');

    // State cho Modal "Chiều cao"
    const [heightModalVisible, setHeightModalVisible] = useState(false);
    const [selectedHeight, setSelectedHeight] = useState(null);

    // State cho Modal "Giới tính"
    const [genderModalVisible, setGenderModalVisible] = useState(false);
    const [selectedGender, setSelectedGender] = useState(null);

    // Mảng các lựa chọn cho "Chiều cao" và "Giới tính"
    const heightOptions = ['Dưới 150cm', 'Từ 150cm đến 170cm', 'Trên 170cm'];
    const genderOptions = ['Nam', 'Nữ', 'Khác'];

    // Hàm để chọn lựa cho "Chiều cao"
    const handleHeightPress = (height) => {
        setSelectedHeight(height);
        setHeightModalVisible(false);
    };

    // Hàm để chọn lựa cho "Giới tính"
    const handleGenderPress = (gender) => {
        setSelectedGender(gender);
        setGenderModalVisible(false);
    };

    return (
        <View style={{ flex: 1, padding: 10 }}>
            <View>
                <View style={styles.header}>
                    <TouchableOpacity onPress={goBack}>
                        <MaterialIcons name="arrow-back" size={24} color="black" />
                    </TouchableOpacity>
                    <View style={styles.hashtagContainer}>
                        <Text style={styles.hashtag}>Tải lên trang phục</Text>
                    </View>
                </View>
            </View>

            {/* Hiển thị ảnh đã chọn */}
            {selectedImage && (
                <View style={styles.imageContainer}>
                    <Image source={{ uri: selectedImage.uri }} style={styles.selectedImage} />
                </View>
            )}

            {/* Title "Gợi ý trang phục" */}
            <Text style={styles.title}>Gợi ý trang phục</Text>

            {/* Ô input và hint text */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Chia sẻ các mẹo tạo kiểu của bạn, như kết hợp màu sắc, tỷ lệ kích thước và nhiều mẹo khác."
                    placeholderTextColor="gray"
                    multiline
                    value={inputText}
                    onChangeText={setInputText}
                />
            </View>

            {/* Các ô thông tin */}
            <View style={styles.infoContainer}>
                {/* Ô "Chiều cao" */}
                <View style={styles.infoItem}>
                    <Text style={styles.infoTitle}>Chiều cao</Text>
                    <TouchableOpacity onPress={() => setHeightModalVisible(true)}>
                        <MaterialIcons name="navigate-next" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                {/* Hiển thị thông tin đã chọn (nếu có) */}
                <Text style={styles.selectedInfo}>{selectedHeight || 'Chọn chiều cao'}</Text>

                {/* Ô "Giới tính" */}
                <View style={styles.infoItem}>
                    <Text style={styles.infoTitle}>Giới tính</Text>
                    <TouchableOpacity onPress={() => setGenderModalVisible(true)}>
                        <MaterialIcons name="navigate-next" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                {/* Hiển thị thông tin đã chọn (nếu có) */}
                <Text style={styles.selectedInfo}>{selectedGender || 'Chọn giới tính'}</Text>

                {/* Ô "Vị trí" */}
                <View style={styles.infoItem}>
                    <Text style={styles.infoTitle}>Vị trí</Text>
                    <TouchableOpacity>
                        <MaterialIcons name="navigate-next" size={24} color="black" />
                    </TouchableOpacity>
                </View>

                {/* Ô "Link" */}
                <View style={styles.infoItem}>
                    <Text style={styles.infoTitle}>Link</Text>
                    <TouchableOpacity>
                        <MaterialIcons name="navigate-next" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Modal cho "Chiều cao" */}
            <Modal visible={heightModalVisible} animationType="slide">
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Chọn Chiều Cao</Text>
                    <FlatList
                        data={heightOptions}
                        keyExtractor={(item) => item}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => handleHeightPress(item)}>
                                <Text style={styles.modalItem}>{item}</Text>
                            </TouchableOpacity>
                        )}
                    />
                    <TouchableOpacity onPress={() => setHeightModalVisible(false)}>
                        <Text style={styles.closeButton}>Đóng</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            {/* Modal cho "Giới tính" */}
            <Modal visible={genderModalVisible} animationType="slide">
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Chọn Giới Tính</Text>
                    <FlatList
                        data={genderOptions}
                        keyExtractor={(item) => item}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => handleGenderPress(item)}>
                                <Text style={styles.modalItem}>{item}</Text>
                            </TouchableOpacity>
                        )}
                    />
                    <TouchableOpacity onPress={() => setGenderModalVisible(false)}>
                        <Text style={styles.closeButton}>Đóng</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, styles.draftButton]}
                    onPress={() => {
                        Alert.alert('Thông báo', 'Bản nháp đã được tạo thành công.');
                        navigation.navigate(ROUTES.PROFILE_NAVIGATOR);
                    }}
                >
                    <Text style={styles.buttonText}>Bản nháp</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, styles.postButton]}
                    onPress={() => {
                        Alert.alert('Thông báo', 'Bài đăng đã được đăng thành công.');
                        navigation.navigate(ROUTES.HOME_NAVIGATOR);
                    }}
                >
                    <Text style={styles.buttonText}>Đăng</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    hashtagContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    hashtag: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    imageContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    selectedImage: {
        width: 200,
        height: 200,
        resizeMode: 'cover',
        marginBottom: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
    },
    inputContainer: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
        padding: 10,
        marginTop: 10,
    },
    input: {
        height: 100,
        textAlignVertical: 'top',
    },
    infoContainer: {
        marginTop: 20,
    },
    infoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        paddingVertical: 10,
    },
    infoTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    selectedInfo: {
        color: 'gray',
        marginLeft: 10,
        marginBottom: 10,
    },
    modalContainer: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    modalItem: {
        fontSize: 18,
        marginBottom: 15,
        color: 'blue', // Màu chữ của từng lựa chọn
    },
    closeButton: {
        fontSize: 18,
        color: 'red', // Màu chữ của nút đóng
        marginTop: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },

    button: {
        flex: 1,
        height: 40,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5,
        marginRight: 5,
    },

    draftButton: {
        backgroundColor: 'gray', // Màu nền cho nút "Bản nháp"
    },

    postButton: {
        backgroundColor: '#99A1E8', // Màu nền cho nút "Đăng"
    },

    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default UpPostScreen;
