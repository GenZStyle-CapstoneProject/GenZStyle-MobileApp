import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { useFonts, Pacifico_400Regular } from "@expo-google-fonts/pacifico";
import * as ImagePicker from "expo-image-picker";
import { useSelector } from "react-redux";

import { useAppDispatch } from "../../app/hooks";
import { updateProfile, getProfile } from "../../features/userSlice";
const UpdateProfileScreen = () => {
  const dispatch = useAppDispatch();
  const userProfile = useSelector((state) => state.user.profile);
  const navigation = useNavigation();
  const profile = useSelector((state) => state.user.profile);
  const accountId = useSelector((state) => state.user.accountId);
  const [selectedImage, setSelectedImage] = useState(null);

  // Define initial state with user profile data
  const [formData, setFormData] = useState({
    key:
      userProfile && userProfile.data && userProfile.data.accountId
        ? `accountId:${userProfile.data.accountId}`
        : "",

    City: userProfile.City || "",
    Address: userProfile.Address || "",
    Height: userProfile.Height || "",
    Phone: userProfile.Phone || "",
    Gender: userProfile.Gender ? "Nam" : "Nữ",
    Dob: userProfile.Dob || "",
    Avatar: userProfile.data?.Avatar || "",
    
  });

  console.log("Data user", userProfile);

  const handleChange = (name, value) => {
    // Handle null values, set default values, or perform validation
    const sanitizedValue = value || ""; // Set an empty string if value is null
    setFormData({ ...formData, [name]: sanitizedValue });
  };

  useEffect(() => {
    const accountId = userProfile.data?.accounts?.[0]?.accountId || "";

    setFormData({
      key: accountId ? `accountId:${accountId}` : "",
      City: userProfile.data?.city || "",
      Address: userProfile.data?.address || "",
      Height: userProfile.data?.height || "",
      Phone: userProfile.data?.phone || "",
      Gender: userProfile.data?.gender ? "Nam" : "Nữ",
      Dob: userProfile.data?.dob || "",
      Avatar: userProfile.data?.avatar || "",
    });
  }, [userProfile]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const { City, Address, Height, Phone, Gender, Dob } = formData;

    const key = userProfile?.data?.accounts?.[0]?.accountId || "";

    if (!key) {
      console.error("Invalid key value");
      return;
    }

    try {
      await dispatch(
        updateProfile({
          key,
          City,
          Address,
          Height,
          Phone,
          Gender: Gender === "Nam",
          Dob,
          Avatar: selectedImage || Avatar,
        })
      );

      await dispatch(getProfile(key));

      console.log("Profile updated successfully");
Alert.alert("Success", "Profile updated successfully", [
        {
          text: "OK",
          onPress: () => {
            navigation.navigate("Profile");
          },
        },
      ]);
    } catch (error) {
      console.error("Failed to update profile", error);
    }
  };


  const handleGoBack = () => {
    navigation.goBack();
  };

  let [fontsLoaded] = useFonts({
    Pacifico_400Regular,
  });
  const handleChangeAvatar = async () => {
    Alert.alert(
      "Chọn hình ảnh",
      "Bạn muốn chọn hình ảnh từ đâu?",
      [
        {
          text: "Hủy",
          style: "cancel",
        },
        {
          text: "Camera",
          onPress: () => pickImageFromCamera(),
        },
        {
          text: "Thư viện",
          onPress: () => pickImageFromLibrary(),
        },
      ],
      { cancelable: false }
    );
  };


  const pickImageFromCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access the camera is required!");
      return;
    }

    const pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!pickerResult.cancelled) {
      console.log("Hình ảnh đã được chọn từ máy ảnh:", pickerResult.uri);
      setSelectedImage(pickerResult.uri);
    }
  };

  const pickImageFromLibrary = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!pickerResult.cancelled) {
      console.log("Hình ảnh đã được chọn từ thư viện:", pickerResult.uri);
      setSelectedImage(pickerResult.uri);
    }
  };

  const [genderModalVisible, setGenderModalVisible] = useState(false);
  const [selectedGender, setSelectedGender] = useState(
    profile?.data?.gender ? "Nam" : "Nữ"
  );

  const genderOptions = ["Nam", "Nữ", "Khác"];

  const handleGenderSelect = (gender) => {
    const isMale = gender === "Nam";
    setFormData({ ...formData, Gender: isMale ? "Nam" : "Nữ" });
    setSelectedGender(gender);
    setGenderModalVisible(false);
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={handleGoBack} style={styles.headerBack}>
          <Icon name="keyboard-arrow-left" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chỉnh sửa hồ sơ</Text>
        <TouchableOpacity style={styles.headerSave} onPress={handleSubmit}>
          <Text style={styles.headerSaveText}>Hoàn tất</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.avatarContainer}>
{/* <Image
          source={{ uri: profile?.data?.accounts[0]?.user?.avatar }}
          style={styles.profileImage}
        /> */}
        <Image
          source={{ uri: selectedImage || profile?.data?.accounts[0]?.user?.avatar }}
          style={styles.profileImage}
        />


        <TouchableOpacity
          onPress={handleChangeAvatar}
          style={styles.changeAvatarButton}
        >
          <Text style={styles.changeAvatarText}>Thay đổi hình ảnh</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ngày sinh"
          value={formData.Dob}
          onChangeText={(text) => handleChange("Dob", text)}
        />
        {/* Số điện thoại */}
        <TextInput
          style={styles.input}
          placeholder="Phone"
          value={formData.Phone}
          onChangeText={(text) => handleChange("Phone", text)}
        />

        <View style={styles.rowContainer}>
          {/* Chiều cao */}

          <TextInput
            style={styles.halfInput}
            placeholder="Nhập chiều cao"
            value={formData.Height.toString()}
            onChangeText={(text) => handleChange("Height", text)}
          />

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
        <TextInput
          style={styles.input}
          placeholder="Nhập thành phố/tỉnh"
          value={formData.City}
          onChangeText={(text) => handleChange("City", text)}
        />

        {/* Địa chỉ */}
        <TextInput
          style={styles.input}
          placeholder="Nhập địa chỉ"
          value={formData.Address}
          onChangeText={(text) => handleChange("Address", text)}
        />
      </View>
      <View style={styles.textContainer}>
        {fontsLoaded && <Text style={styles.text}>StyleGenz</Text>}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 50,
    backgroundColor: "white",
  },
headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 15,
  },
  headerBack: {
    right: 20,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  avatarContainer: {
    marginRight: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  changeAvatarButton: {
    marginTop: 20,
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "gray",
  },
  changeAvatarText: {
    color: "black",
    fontSize: 16,
  },
  headerSave: {
    marginLeft: 10,
  },
  headerSaveText: {
    fontSize: 16,
    color: "gray",
  },
  inputContainer: {
    marginTop: 35,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfInput: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginRight: 5,
    marginBottom: 20,
  },
  genderLabel: {
    flex: 1,
    fontSize: 16,
    marginRight: 10,
    color: "black",
  },
  genderText: {
    fontSize: 16,
    color: "black",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  genderModal: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  genderOption: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
  textContainer: {
    backgroundColor: "#99A1E8",
    padding: 25,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  text: {
    fontFamily: "Pacifico_400Regular",
    fontSize: 50,
    color: "black",
  },
});

export default UpdateProfileScreen;