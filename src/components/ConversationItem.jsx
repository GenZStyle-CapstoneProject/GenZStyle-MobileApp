import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons"; // Import the icons
import ProfileInfo from "./common/ProfileInfo";

import { theme } from "../constants/theme";
import ROUTES from "../constants/routes";

const ConversationItem = ({
  picture,
  roomName,
  fullName,
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
  members,
  isFriend,
  isFollower,
  isFollowing,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const showStoryCircle = () => {
    if (hasStory) {
      return {
        borderColor: theme.colors.storyBorder,
        borderWidth: 2,
      };
    }
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
      <TouchableOpacity
        style={styles.conversation}
        onPress={() =>
          navigation.navigate(ROUTES.MESSAGESSCREEN, {
            roomName: roomName,
            fullName: fullName,
            bio: bio,
            type: type,
            picture: picture,
            isBlocked: isBlocked,
            isMuted: isMuted,
            isOnline: isOnline,
            roomId: roomId,
            members: members,
            isFollower: isFollower,
            isFollowing: isFollowing,
          })
        }
      >
        <View>
          <TouchableOpacity
            onPress={() => setModalVisible((currentValue) => !currentValue)}
            style={[styles.imageContainer, showStoryCircle()]}
          >
            {picture !== "" ? (
              <Image style={styles.image} source={{ uri: picture }} />
            ) : (
              <FontAwesome
                name="group"
                size={30}
                color={theme.colors.messageBackground}
              />
            )}
          </TouchableOpacity>
          {isOnline && <View style={styles.online} />}
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
            <Text numerOfLine={1} style={styles.username}>
              {roomName}
            </Text>
            <Text style={styles.time}>{time}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            {isFriend ? (
              <Text style={styles.message}>{lastMessage ?? ""}</Text>
            ) : (
              <Text style={styles.message}>{}</Text>
            )}
            {/* {showNotification("number")} */}
          </View>
        </View>
      </TouchableOpacity>
      <Modal animationType="slide" transparent visible={modalVisible}>
        <ProfileInfo
          roomName={roomName}
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
    fontSize: theme.fontSize.title,
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
});

export default ConversationItem;
