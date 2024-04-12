import React, { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "@expo/vector-icons/MaterialIcons";

import Conversations from "../components/Conversations";

import { theme } from "../constants/theme";
import { fabStyles } from "../constants/styles";
import { Alert } from "react-native";
import { Modal } from "react-native";
import { Pressable } from "react-native";
import { StyleSheet } from "react-native";
import { useState } from "react";
import { TextInput } from "react-native";
import { socket } from "../services/chatService";
import { useAppSelector } from "../app/hooks";

const ConversationsScreen = () => {
  const profile = useAppSelector((state) => state.user.profile?.data);
  const [modalVisible, setModalVisible] = useState(false);
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const onCreateGroup = async () => {
    if (text !== "") {
      await socket.emit("create-group", {
        host: profile.account.accountId,
        hostName: `${profile?.account?.firstname} ${profile?.account?.lastname}`,
        name: text,
        type: "group",
      });
      setModalVisible(false);
    } else {
      setError("Enter group name.");
    }
  };

  useEffect(() => {
    if (error !== "") {
      if (text !== "") {
        setError("");
      }
    }
  }, [text, error]);

  return (
    <View
      style={{
        backgroundColor: theme.colors.white,
        flex: 1,
        marginTop: 30,
      }}
    >
      <Conversations></Conversations>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={fabStyles.style}
      >
        <Icon name="chat" size={30} color={theme.colors.primary} />
      </TouchableOpacity>

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Tạo nhóm mới</Text>
            <TextInput
              placeholder={"Tên nhóm"}
              style={styles.input}
              value={text}
              onChangeText={(text) => setText(text)}
            />
            <Text style={styles.errorText}>{error}</Text>
            <View style={styles.betweenView}>
              <Pressable
                style={[styles.button, styles.buttonCreate]}
                onPress={() => onCreateGroup()}
              >
                <Text style={styles.textStyle}>Tạo</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonCancel]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Hủy</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
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
  buttonCreate: {
    backgroundColor: theme.colors.primary,
  },
  buttonCancel: {
    backgroundColor: theme.colors.danger,
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
export default ConversationsScreen;
