import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { IconButton } from "react-native-paper";
import ROUTES from "../../constants/routes";
import kol_icon from "../../../assets/kol-icon.jpg";
import player_icon from "../../../assets/player-icon.png";

const HeaderProfile = ({ userInfo, profile, followersData }) => {
  const navigation = useNavigation();
  console.log("profile", profile);
  const handleSetting = () => {
    console.log("userInfo in handleSetting: ", userInfo);
    navigation.navigate("Setting", { userInfo });
  };

  const handleSignin = () => {
    navigation.navigate("LoginInProfile");
  };
  const handleFollowers = () => {
    navigation.navigate("ListFollow", {
      screen: "Người theo dõi",
      profile,
      followersData,
    });
  };

  const handleFollowing = () => {
    navigation.navigate("ListFollow", {
      screen: "Đang theo dõi",
      profile,
      followersData,
    });
  };

  return (
    <View style={styles.header}>
      <View style={styles.iconContainer}>
        <View
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity onPress={handleSetting}>
            <Ionicons
              name="settings-outline"
              size={24}
              color="black"
              style={styles.icon}
            />
          </TouchableOpacity>
          <IconButton
            icon="chat"
            color="#000"
            // onPress={() => console.log('Chat button pressed')}
            onPress={() => navigation.navigate(ROUTES.CONVERSATIONS)}
          />
        </View>
      </View>

      <View style={styles.topRow}>
        <View style={styles.avatarContainer}>
          {/* <Image
            source={require("../../../assets/avatar.jpg")}
            style={styles.profileImage}
          /> */}
          <Image
            source={{ uri: profile?.data?.account?.user?.avatar }}
            style={styles.profileImage}
          />
        </View>
        <View style={styles.userInfo}>
          <View style={{ flexDirection: "row" }}>
            <View>
              <Text style={styles.username}>
                {(() => {
                  let fullname = "Thông tin cá nhân";
                  if (
                    profile?.data?.account?.firstname &&
                    profile?.data?.account?.lastname
                  ) {
                    fullname = `${profile?.data?.account?.firstname} ${profile?.data?.account?.lastname}`;
                  }

                  return fullname.length > 20
                    ? `${fullname.slice(0, 20)}...`
                    : fullname;
                })()}
              </Text>
              {profile?.data?.role && (
                <View style={{ position: "absolute", top: -10, right: -35 }}>
                  <Image
                    source={
                      profile?.data?.role === "KOL" ? kol_icon : player_icon
                    }
                    style={{
                      height: 30,
                      width: 30,
                      borderRadius: 100,
                      borderWidth: 0.5,
                      borderColor:
                        profile?.data?.role === "KOL"
                          ? "transparent"
                          : "#1C6758",
                    }}
                  />
                </View>
              )}
            </View>
          </View>

          <Text style={styles.account}>
            <Text style={styles.account}>
              {profile?.data?.account?.email || "exmaple@gmail.com"}
            </Text>
          </Text>
          <Text style={styles.account}>
            {profile?.data?.height || "xxx cm"} cm
          </Text>
        </View>
      </View>
      {/* <Text style={styles.bioContent}>Just do it </Text> */}
      <View style={styles.bioContainer}>
        <View style={styles.bioColumn}>
          <TouchableOpacity onPress={handleFollowers}>
            <Text style={styles.bioCount}>
              {followersData?.followers?.length || "0"}
            </Text>
            <Text style={styles.bioText}>Người theo dõi</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bioColumn}>
          <TouchableOpacity onPress={handleFollowing}>
            <Text style={styles.bioCount}>
              {followersData?.following?.length || "0"}
            </Text>
            <Text style={styles.bioText}>Đang theo dõi</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.notLoggedInContainer}>
        {profile === null && (
          <TouchableOpacity onPress={() => handleSignin()}>
            <View style={styles.loginButton}>
              <Text style={styles.loginButtonText}>Đăng nhập</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
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
    marginVertical: 10,
  },
  notLoggedInText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: "#1C6758",
    color: "white",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignSelf: "center",
  },
  loginButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default HeaderProfile;
