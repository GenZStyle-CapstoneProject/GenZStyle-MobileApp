import React, { useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

import { useEffect } from "react";
import { socket } from "../services/chatService";
import useAuthContext from "../hooks/useAuthContext";
import { parseMessageTime } from "../utils";
import MemberItem from "./MemberItem";
import { theme } from "../constants/theme";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import Icon from "@expo/vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

const GroupMembersScreen = ({ children, route }) => {
  const { roomId } = route.params;
  const navigation = useNavigation();
  const { currentUser } = useAuthContext();
  const [onlineUser, setOnlineUsers] = useState([]);
  const [userRooms, setUserRooms] = useState([]);
  const [members, setMembers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const goBack = () => {
    navigation.goBack();
  };

  const onAddMember = async () => {
    if (text !== "") {
      await socket.emit("add_to_group", {
        roomId: roomId,
        userId: text,
      });
      setModalVisible(false);
    } else {
      setError("Enter group name.");
    }
  };

  useEffect(() => {
    socket.emit("get_group_members", {
      roomId: roomId,
    });
  }, []);

  useEffect(() => {
    socket.on("group_members", (data) => {
      console.log("group member", data);
      setMembers(data);
    });
  }, [socket]);
  return (
    <View
      style={{ backgroundColor: theme.colors.white, flex: 1, marginTop: 30 }}
    >
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <Icon name="angle-left" size={30} />
        </TouchableOpacity>
        <Text style={{ fontSize: 20 }}>Members</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Icon name="plus" size={10} color={theme.colors.black} />
          <Text style={{ fontSize: 20 }}>Add</Text>
        </TouchableOpacity>
      </View>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Add new member</Text>
            <TextInput
              placeholder={"Member name"}
              style={styles.input}
              value={text}
              onChangeText={(text) => setText(text)}
            />
            <Text style={styles.errorText}>{error}</Text>
            <View style={styles.betweenView}>
              <Pressable
                style={[styles.button, styles.buttonCreate]}
                onPress={() => onAddMember()}
              >
                <Text style={styles.textStyle}>Add</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonCancel]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <ScrollView>
        {children}
        {members?.length > 0 &&
          members.map((member) => (
            <MemberItem
              key={member.id}
              picture=""
              username={member.name}
              isHost={member.isHost}
              bio="my name is Mercy Patrick"
              lastMessage="Hello there"
              time="4:00 PM"
              isBlocked
              isMuted
            />
          ))}

        {/* <MemberItem
          picture="https://images.pexels.com/photos/5486199/pexels-photo-5486199.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          username="Jack Randolph"
          bio="my name is Mercy Patrick"
          lastMessage="Hello there"
          time="4:00 PM"
          isBlocked
          isMuted
        />

        <MemberItem
          picture="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          username="Stephany Garcia"
          bio="my name is Mercy Patrick"
          lastMessage="Hello there"
          time="4:00 PM"
          notification="5"
          isBlocked
          isMuted
          hasStory
        /> */}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: theme.colors.description,
    padding: 10,
  },
  backButton: {
    alignSelf: "center",
    paddingHorizontal: 10,
  },
  addButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
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
});
export default GroupMembersScreen;
