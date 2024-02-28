
import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const HeaderProfile = ({ userInfo, profile }) => {

  const navigation = useNavigation();

  const handleSetting = () => {
    console.log("userInfo in handleSetting: ", userInfo);
    navigation.navigate("Setting", { userInfo });
  };

  const handleSignin = () => {
    navigation.navigate("Login");
  };
  const handleFollowers = () => {
    navigation.navigate("ListFollow", { screen: "Người theo dõi" });
  };

  const handleFollowing = () => {
    navigation.navigate("ListFollow", { screen: "Đang theo dõi" });
  };


  return (
    <View style={styles.header}>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={handleSetting}>
          <Ionicons
            name="settings-outline"
            size={24}
            color="black"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.topRow}>
        <View style={styles.avatarContainer}>
          <Image
            source={require("../../../assets/avatar.jpg")}
            style={styles.profileImage}
          />
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.username}>
            {/* {profile?.data?.accounts[0]?.firstname &&
              profile?.data?.accounts[0]?.lastname
              ? profile?.data?.accounts[0]?.firstname +
              " " +
              profile?.data?.accounts[0]?.lastname
              : "Thông tin cá nhân"} */}
            <Text style={styles.username}>
              {`${profile?.data?.accounts[0]?.firstname || ''} ${profile?.data?.accounts[0]?.lastname || ''}`}
            </Text>
          </Text>
          <Text style={styles.account}>
            <Text style={styles.account}>
              {profile?.data?.accounts[0]?.email}
            </Text>
          </Text>
          <Text style={styles.account}>  {profile?.data?.height}</Text>
        </View>
      </View>
      <Text style={styles.bioContent}>Just do it </Text>
      <View style={styles.bioContainer}>
        <View style={styles.bioColumn}>
          <TouchableOpacity>
            <Text style={styles.bioCount}>0</Text>
            <Text style={styles.bioText}>Người theo dõi</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bioColumn}>
          <TouchableOpacity>
            <Text style={styles.bioCount}>0</Text>
            <Text style={styles.bioText}>Đang theo dõi</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* <View style={styles.notLoggedInContainer}>
        {profile === null && (
          <TouchableOpacity onPress={() => handleSignin()}>
            <View style={styles.loginButton}>
              <Text style={styles.loginButtonText}>Đăng nhập</Text>
            </View>
          </TouchableOpacity>
        )}
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "column",
    paddingHorizontal: 20,
    marginTop: 70,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 10,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarContainer: {
    marginRight: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
  },
  account: {
    fontSize: 16,
    marginTop: 5,
    color: "gray",
  },
  icon: {
    marginLeft: 20,
  },
  bioContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  bioColumn: {
    alignItems: "center",
  },
  bioCount: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  bioText: {
    fontSize: 14,
    color: "gray",
  },
  bioContent: {
    fontSize: 16,
    marginTop: 10,
  },
  notLoggedInContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  notLoggedInText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: "black",
    color: "white",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignSelf: "center",
  },
  loginButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default HeaderProfile;
