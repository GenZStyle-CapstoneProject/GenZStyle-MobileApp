import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  Button,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons"; // Import the icons

import { theme } from "../constants/theme";
import ROUTES from "../constants/routes";
import ProfileInfo from "../components/common/ProfileInfo";
import { useAppSelector } from "../app/hooks";
import { socket } from "../services/chatService";
import Icon from "@expo/vector-icons/MaterialIcons";

const MemberItem = ({
  picture,
  username,
  bio,
  lastMessage,
  time,
  isBlocked,
  isMuted,
  notification,
  hasStory,
  isOnline,
  type,
  roomId,
  isHost,
  userId,
  hostId,
  onPress,
  isSelected,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const profile = useAppSelector((state) => state.user.profile?.data);
  const navigation = useNavigation();
  const showStoryCircle = () => {
    if (hasStory) {
      return {
        borderColor: theme.colors.storyBorder,
        borderWidth: 2,
      };
    }
  };

  const removerGroupMember = async () => {
    Alert.alert(
      `Xóa ${username} ra khỏi nhóm?`,
      `${username} sẽ không thể truy cập và xem tin nhắn của nhóm nữa`,
      [
        {
          text: "OK",
          onPress: async () =>
            await socket.emit("remove_group_member", {
              roomId: roomId,
              userId: userId,
            }),
          style: "default",
        },
        {
          text: "Hủy",
          style: "cancel",
        },
      ]
    );
  };

  const showNotification = (type) => {
    if (notification && type === "number") {
      return (
        <View style={styles.notificationCircle}>
          <Text style={styles.notification}>{notification}</Text>
        </View>
      );
    } else if (notification && type === "imageCircle") {
      return {
        borderColor: theme.colors.primary,
      };
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.conversation} onPress={() => onPress()}>
        <View>
          <View style={[styles.imageContainer, showStoryCircle()]}>
            {picture !== "" ? (
              <Image style={styles.image} source={{ uri: picture }} />
            ) : (
              <FontAwesome
                name="user"
                size={30}
                color={theme.colors.messageBackground}
              />
            )}
          </View>
          {isSelected ? (
            <View style={styles.check}>
              <Icon name="check" size={15} color={"green"} />
            </View>
          ) : (
            isOnline && <View style={styles.online} />
          )}
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text numerOfLine={1} style={styles.username}>
                {username}
              </Text>
            </View>

            <View>
              {isHost && (
                <Text style={{ fontSize: 16, color: theme.colors.primary }}>
                  Chủ nhóm
                </Text>
              )}
              {hostId === profile?.account?.accountId && !isHost && (
                <Button
                  title="Xóa"
                  color={theme.colors.danger}
                  onPress={() => removerGroupMember()}
                />
              )}
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <Modal animationType="slide" transparent visible={modalVisible}>
        <ProfileInfo
          username={username}
          picture={picture}
          bio={bio}
          isBlocked={isBlocked}
          isMuted={isMuted}
          hide={() => setModalVisible(false)}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  conversation: {
    flexDirection: "row",
    paddingBottom: 25,
    paddingRight: 20,
    paddingLeft: 10,
  },
  imageContainer: {
    marginRight: 15,
    borderRadius: 25,
    height: 50,
    width: 50,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    position: "relative",
    zIndex: 97,
  },
  image: {
    height: 55,
    width: 55,
  },
  username: {
    fontSize: 20,
    color: theme.colors.title,
    width: 210,
  },
  message: {
    fontSize: theme.fontSize.message,
    width: 240,
    color: theme.colors.subTitle,
  },
  time: {
    fontSize: theme.fontSize.subTitle,
    color: theme.colors.subTitle,
    fontWeight: "300",
  },
  notificationCircle: {
    backgroundColor: theme.colors.primary,
    borderRadius: 50,
    height: 20,
    width: 20,
    marginRight: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  notification: {
    color: theme.colors.white,
    fontWeight: "bold",
    fontSize: 10,
  },
  online: {
    width: 10,
    height: 10,
    right: 15,
    bottom: 5,
    zIndex: 99,
    borderRadius: 24,
    borderStyle: "solid",
    borderWidth: 1,
    backgroundColor: "#09be02",
    position: "absolute",
  },
  check: {
    width: 20,
    height: 20,
    right: 15,
    bottom: 5,
    zIndex: 99,
    borderRadius: 24,
    borderStyle: "solid",
    borderWidth: 2,
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "green",
    backgroundColor: "white",
  },
});

export default MemberItem;
