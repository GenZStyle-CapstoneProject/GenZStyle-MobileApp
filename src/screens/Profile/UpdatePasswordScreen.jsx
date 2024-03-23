import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Ionicons, FontAwesome6 } from "@expo/vector-icons";

const UpdatePasswordScreen = ({ navigation }) => {
    const [showPasswordFields, setShowPasswordFields] = useState([false, false, false]);

    const togglePasswordVisibility = (index) => {
        const updatedShowPasswordFields = [...showPasswordFields];
        updatedShowPasswordFields[index] = !updatedShowPasswordFields[index];
        setShowPasswordFields(updatedShowPasswordFields);
    };

    return (
        <View style={styles.container}>
            <View style={{ position: 'absolute', top: 40, left: 20, padding: 7, backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 50 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}><Ionicons name="arrow-back" size={30} color="white" /></TouchableOpacity>
            </View>

            <Text style={styles.title}>ĐỔI MẬT KHẨU</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>Mật khẩu cũ</Text>
                <View style={styles.inputWrapper}>
                    <TextInput
                        style={styles.input}
                        placeholder="Nhập mật khẩu cũ"
                        secureTextEntry={!showPasswordFields[0]}
                    />
                    <TouchableOpacity
                        style={styles.eyeIcon}
                        onPress={() => togglePasswordVisibility(0)}>
                        <Icon
                            name={showPasswordFields[0] ? 'eye' : 'eye-slash'}
                            size={20}
                            color="#888"
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>Mật khẩu mới</Text>
                <View style={styles.inputWrapper}>
                    <TextInput
                        style={styles.input}
                        placeholder="Nhập mật khẩu mới"
                        secureTextEntry={!showPasswordFields[1]}
                    />
                    <TouchableOpacity
                        style={styles.eyeIcon}
                        onPress={() => togglePasswordVisibility(1)}>
                        <Icon
                            name={showPasswordFields[1] ? 'eye' : 'eye-slash'}
                            size={20}
                            color="#888"
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>Nhập lại mật khẩu mới</Text>
                <View style={styles.inputWrapper}>
                    <TextInput
                        style={styles.input}
                        placeholder="Nhập lại mật khẩu mới"
                        secureTextEntry={!showPasswordFields[2]}
                    />
                    <TouchableOpacity
                        style={styles.eyeIcon}
                        onPress={() => togglePasswordVisibility(2)}>
                        <Icon
                            name={showPasswordFields[2] ? 'eye' : 'eye-slash'}
                            size={20}
                            color="#888"
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={() => console.log("Saved")}>
                    <Text style={styles.buttonText}>Lưu</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default UpdatePasswordScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#DBE9EC',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    inputContainer: {
        width: '100%',
        marginBottom: 20,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputTitle: {
        fontSize: 18,
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 8,
        fontSize: 16,
        flex: 1,
    },
    eyeIcon: {
        position: 'absolute',
        right: 10,
    },
    buttonContainer: {
        justifyContent: 'center',
        width: '50%',
        marginTop: 20,
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 16,
        color: '#000',
    },
    cancelButton: {
        backgroundColor: '#ff0000',
    },
    saveButton: {
        backgroundColor: '#1C6758',
    },
});
