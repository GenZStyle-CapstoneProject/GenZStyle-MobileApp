import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

const CameraScreen = () => {
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [image, setImage] = useState(null);
    const cameraRef = useRef(null);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasCameraPermission(status === 'granted');
        })();
    }, []);

    const pickImageFromCamera = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
            Alert.alert('Permission Required', 'Permission to access the camera is required!');
            return;
        }

        const pickerResult = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });

        if (!pickerResult.cancelled) {
            setImage(pickerResult.uri);
        }
    };

    const handleCapture = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync();
            // Handle the captured photo as needed
            console.log(photo);
        }
    };

    if (hasCameraPermission === null) {
        return <View />;
    }

    if (hasCameraPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={{ flex: 1 }}>
            <Camera
                style={{ flex: 1 }}
                type={Camera.Constants.Type.back}
                ref={cameraRef}
            >
                <View style={{ flex: 1, backgroundColor: 'transparent', flexDirection: 'row' }}>
                    <TouchableOpacity
                        style={{ flex: 0.1, alignSelf: 'flex-end', alignItems: 'center' }}
                        onPress={handleCapture}
                    >
                        <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>Capture</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ flex: 0.1, alignSelf: 'flex-end', alignItems: 'center' }}
                        onPress={pickImageFromCamera}
                    >
                        <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>Pick Image</Text>
                    </TouchableOpacity>
                </View>
            </Camera>
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        </View>
    );
};

export default CameraScreen;