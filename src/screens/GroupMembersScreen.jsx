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
import { parseMessageTime } from "../utils";
import MemberItem from "./MemberItem";
import { theme } from "../constants/theme";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import Icon from "@expo/vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { useAppSelector } from "../app/hooks";
import ROUTES from "../constants/routes";

const GroupMembersScreen = ({ children, route }) => {
  const { roomId } = route.params;
  const navigation = useNavigation();
  const [hostId, setHostId] = useState("");
  const [members, setMembers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [noUser, setNoUser] = useState(true);
  const profile = useAppSelector((state) => state.user.profile?.data);
  const followData = useAppSelector((state) => state.user.data);

  const goBack = () => {
    // navigation.goBack();
    navigation.navigate(ROUTES.HOME);
  };

  const navigateToFriend = (user) => {
    navigation.navigate(ROUTES.FRIENDS, { item: user });
  };

  const onAddMember = async () => {
    try {
      if (selectedUsers.length > 0) {
        await socket.emit("add_to_group", {
          roomId: roomId,
          users: selectedUsers,
        });

        setSelectedUsers([]);
        setModalVisible(false);
      } else {
        setError("Enter member name.");
      }
    } catch (err) {
      console.log("onAddMember error", err);
    }
  };

  const onSelectUser = async (id) => {
    let newSelecteds = [...selectedUsers];
    const foundIndex = newSelecteds.findIndex((userId) => userId == id);
    if (foundIndex > -1) {
      newSelecteds = newSelecteds.filter((userId) => userId != id);
      setSelectedUsers(newSelecteds);
    } else {
      newSelecteds.push(id);
      setSelectedUsers(newSelecteds);
    }
  };

  useEffect(() => {
    socket.emit("get_group_members", {
      roomId: roomId,
    });
  }, []);

  useEffect(() => {
    socket.on("group_members", (data) => {
      setMembers(data);
      const hostId = data.find((member) => member.isHost === true)?.id;
      setHostId(hostId);
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
        <Text style={{ fontSize: 20 }}>Thành viên</Text>
        {hostId == profile?.account?.accountId ? (
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setModalVisible(true)}
          >
            <Icon name="plus" size={10} color={theme.colors.black} />
            <Text style={{ fontSize: 20 }}>Thêm</Text>
          </TouchableOpacity>
        ) : (
          <View style={{ width: 20 }}></View>
        )}
      </View>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Thêm thành viên nhóm</Text>
            <View style={{ height: 300 }}>
              <ScrollView>
                {noUser && (
                  <Text
                    style={{
                      fontSize: 18,
                      color: theme.colors.primary,
                    }}
                  >
                    {"Không có người nào để thêm"}
                  </Text>
                )}
                <View style={{ width: 350 }}>
                  {followData.following?.length > 0 &&
                    followData.following?.map((followUser) => {
                      if (
                        members.findIndex(
                          (member) => member.id == followUser.accountId
                        ) < 0
                      ) {
                        if (noUser) {
                          setNoUser(false);
                        }
                        return (
                          <MemberItem
                            key={followUser.accountId}
                            picture={followUser.avatar}
                            username={followUser.username}
                            userId={followUser.accountId}
                            roomId={roomId}
                            bio=""
                            lastMessage="Hello there"
                            time="4:00 PM"
                            isBlocked
                            isMuted
                            isSelected={selectedUsers.includes(
                              followUser.accountId
                            )}
                            onPress={() => onSelectUser(followUser.accountId)}
                          />
                        );
                      }
                    })}
                </View>
              </ScrollView>
            </View>
            <Text style={styles.errorText}>{error}</Text>
            <View style={styles.betweenView}>
              <Pressable
                style={[styles.button, styles.buttonCreate]}
                onPress={() => onAddMember()}
              >
                <Text style={styles.textStyle}>Thêm</Text>
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
      <View style={{ paddingTop: 5 }}>
        <ScrollView>
          {children}
          {members?.length > 0 &&
            members.map((member) => {
              const userList = [
                ...followData.following,
                ...followData.followers,
              ];
              const isCurrentUser = member.id == profile?.account?.accountId;
              const memberInfo =
                member?.id == profile?.account?.accountId
                  ? profile?.account
                  : userList?.find((user) => user?.accountId == member?.id);

              return (
                <MemberItem
                  key={member.id}
                  picture={
                    isCurrentUser
                      ? memberInfo?.user?.avatar
                      : memberInfo?.avatar
                  }
                  username={member.name}
                  userId={member.id}
                  isHost={member.isHost}
                  roomId={roomId}
                  hostId={hostId}
                  bio=""
                  lastMessage="Hello there"
                  time="4:00 PM"
                  isBlocked
                  isMuted
                  onPress={() => {
                    member.id != profile?.account?.accountId &&
                      navigateToFriend(memberInfo);
                  }}
                />
              );
            })}
        </ScrollView>
      </View>
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
    width: 350,
    height: 500,
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
