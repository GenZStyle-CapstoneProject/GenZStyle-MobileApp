import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "@expo/vector-icons/FontAwesome";
import { FontAwesome } from "@expo/vector-icons"; // Import the icons
import { theme } from "../../constants/theme";
import { Modal } from "react-native";
import { useState } from "react";
import { Pressable } from "react-native";
import ROUTES from "../../constants/routes";

const ChatHeader = ({
  username,
  bio,
  picture,
  onlineStatus,
  onPress,
  isOnline,
  type,
  roomId,
}) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={goBack}>
        <Icon name="angle-left" size={30} color={theme.colors.white} />
      </TouchableOpacity>
      <View style={styles.profileOptions}>
        <TouchableOpacity style={styles.profile}>
          {picture !== "" ? (
            <Image style={styles.image} source={{ uri: picture }} />
          ) : (
            <FontAwesome name="group" size={30} color="#c2c2c2" />
          )}
          <View style={styles.usernameAndOnlineStatus}>
            <Text style={styles.username}>{username}</Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
              }}
            >
              {isOnline && <View style={styles.online} />}
              <Text style={styles.onlineStatus}>{onlineStatus}</Text>
            </View>
          </View>
        </TouchableOpacity>
        {type === "group" && (
          <>
            <View style={styles.centeredView}>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Pressable
                      style={[styles.buttonMemberList, styles.actionButton]}
                      // onPress={() => onCreateGroup()}
                    >
                      <Text
                        style={styles.textStyle}
                        onPress={() => {
                          setModalVisible(false);
                          navigation.navigate(ROUTES.GROUPMEMBERSSCREEN, {
                            roomId: roomId,
                          });
                        }}
                      >
                        See members
                      </Text>
                    </Pressable>
                    <Pressable
                      style={[styles.buttonChangeName, styles.actionButton]}
                      // onPress={() => onCreateGroup()}
                    >
                      <Text style={styles.textStyle}>Change group's name</Text>
                    </Pressable>
                    <View style={styles.betweenView}>
                      <View></View>
                      <Pressable
                        style={[styles.button, styles.buttonCancel]}
                        onPress={() => setModalVisible(!modalVisible)}
                      >
                        <Text style={styles.textStyle}>Close</Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
            <View style={styles.options}>
              {/* <TouchableOpacity
              onPress={() =>
                navigation.navigate("OnCallScreen", {
                  username: username,
                  picture: picture,
                })
              }
              style={{ paddingHorizontal: 5 }}
            >
              <Icon name="phone" size={30} color={theme.colors.white} />
            </TouchableOpacity> */}
              <TouchableOpacity
                style={{ paddingHorizontal: 20 }}
                onPress={() => setModalVisible(true)}
              >
                <Icon name="ellipsis-v" size={30} color={theme.colors.white} />
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: theme.colors.primary,
    paddingTop: 40,
    paddingBottom: 10,
  },
  backButton: {
    alignSelf: "center",
    paddingHorizontal: 10,
  },
  profileOptions: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#fff",
    flex: 4,
  },
  image: {
    height: 65,
    width: 65,
    borderRadius: 32.5,
  },
  usernameAndOnlineStatus: {
    flexDirection: "column",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  username: {
    color: theme.colors.white,
    fontSize: 18,
    fontWeight: "bold",
  },
  onlineStatus: {
    color: theme.colors.white,
    fontSize: 16,
  },
  options: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  online: {
    width: 10,
    height: 10,

    zIndex: 99,
    borderRadius: 24,
    borderStyle: "solid",
    borderWidth: 1,
    backgroundColor: "#09be02",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  betweenView: {
    flex: 1,
    marginTop: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalView: {
    width: 300,
    height: 250,
    gap: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    width: 80,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  actionButton: {
    width: "100%",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonMemberList: {
    backgroundColor: theme.colors.primary,
  },
  buttonChangeName: {
    backgroundColor: theme.colors.messageBackground,
  },
  buttonCancel: {
    backgroundColor: "#c2c2c2",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 25,
  },
  errorText: {
    color: theme.colors.danger,
    textAlign: "center",
  },
  input: {
    backgroundColor: "transparent",
    color: theme.colors.inputText,
    flex: 1,
    fontSize: 15,
    alignSelf: "center",
  },
});

export default ChatHeader;
