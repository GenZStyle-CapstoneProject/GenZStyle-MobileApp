import { View, Text, Pressable, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useAppDispatch } from "../app/hooks";
import { Pacifico_400Regular, useFonts } from "@expo-google-fonts/pacifico";
const WelcomeBack = ({ navigation }) => {
  const dispatch = useAppDispatch();
  let [fontsLoaded] = useFonts({
    Pacifico_400Regular,
  });

  const handleGoogleLogin = async () => {
    // console.log('Google Sign In Result:', result);
    // try {
    //     console.log('Google Sign In Result:', result);
    //     await promptAsync();
    // } catch (e) {
    //     console.error('Error with Google Sign In:', e);
    // }
  };
  const handleCheckExitIntro = async () => {
    await dispatch(setExitIntro());
  };
  const onCompleteOnboarding = async () => {
    await AsyncStorage.setItem("appLaunched", "true");
    navigation.replace("tab");
  };
  return (

    <View style={{ flex: 1, backgroundColor: "#DBE9EC" }}>
      <View>
        <Image
          source={require("../../assets/welcome.jpg")}
          style={{
            height: 530,
            width: 410,
            position: "absolute",
            top: 30,
            borderRadius: 10
          }}
        />
      </View>

      {/* content  */}

      <View
        style={{
          paddingHorizontal: 42,
          position: "absolute",
          top: 545,
          width: "100%",
        }}
      >
        {fontsLoaded && <Text style={{
          fontFamily: "Pacifico_400Regular",
          fontSize: 40,
          color: "black",
          left: 25,
        }}>Welcome Back !</Text>}

        {/* Nút Đăng Nhập Bằng Gmail */}
        <Pressable
          style={{
            backgroundColor: COLORS.secondary,
            paddingVertical: 12,
            borderRadius: 8,
            alignItems: "center",
            marginBottom: 12,
            marginTop: 10,
            flexDirection: "row",
            borderColor: COLORS.secondary,
            borderWidth: 2,
          }}
          onPress={handleGoogleLogin}
        >
          {/* Icon Gmail */}
          <Ionicons
            name="logo-google"
            size={24}
            color={COLORS.white}
            style={{ marginRight: 50, marginLeft: 20 }}
          />
          <Text style={{ color: COLORS.white, fontWeight: "bold", fontSize: 15 }}>
            Đăng nhập bằng Gmail
          </Text>
        </Pressable>

        {/* Nút Đăng Nhập  */}
        <Pressable
          style={{
            backgroundColor: COLORS.secondary,
            paddingVertical: 12,
            borderRadius: 8,
            alignItems: "center",
            borderColor: COLORS.white,
            borderWidth: 2,
          }}
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text style={{ color: COLORS.white, fontWeight: "bold", fontSize: 16 }}>
            Đăng nhập
          </Text>
        </Pressable>

        <TouchableOpacity onPress={onCompleteOnboarding}>
          <Text
            style={{
              color: "black",
              fontWeight: "bold",
              paddingVertical: 5,
              borderRadius: 8,
              alignItems: "center",
              marginTop: 5,
              left: 100,
              fontFamily: "Pacifico_400Regular",
            }}
          >
            Không phải bây giờ{" "}
          </Text>

        </TouchableOpacity>
      </View>
    </View>

  );
};

export default WelcomeBack;
