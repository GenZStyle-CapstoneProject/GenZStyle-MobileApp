import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import useAuthContext from "../hooks/useAuthContext";
import ChatHeader from "../components/messages/ChatHeader";
import ChatInput from "../components/messages/ChatInput";
import MessagesList from "../components/messages/MessagesList";
import { socket } from "../services/chatService";
import { theme } from "../constants/theme";
import { Text } from "react-native";
import { StyleSheet } from "react-native";
import { groupByArray } from "../utils";

const MessagesScreen = ({ navigation, route }) => {
  const {
    roomName,
    fullName,
    bio,
    picture,
    isBlocked,
    isMuted,
    type,
    isOnline,
    roomId,
    members,
    isFollower,
    isFollowing,
  } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [reply, setReply] = useState("");
  const [isLeft, setIsLeft] = useState();
  const [messages, setMessages] = useState([]);

  const swipeToReply = (message, isLeft) => {
    setReply(message.length > 50 ? message.slice(0, 50) + "..." : message);
    setIsLeft(isLeft);
  };

  const closeReply = () => {
    setReply("");
  };

  const groupMessageByDate = (messages) => {
    if (messages.length > 0) {
      const newMessages = messages.map((message) => {
        return {
          ...message,
          date: message.time.split(",")[0],
        };
      });
      const groupMessages = groupByArray(newMessages, "date");
      return groupMessages;
    }
  };

  useEffect(() => {
    switch (type) {
      case "personal": {
        socket.emit("join_room", {
          to: roomId,
          type: type,
        });
        return;
      }
      case "group": {
        socket.emit("join_room", {
          roomId: roomId,
          type: type,
        });
        return;
      }
    }
  }, []);
  useEffect(() => {
    socket.on("init_messages", (data) => {
      setMessages(data.messages);
      setIsLoading(false);
    });
    socket.on("receive_message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data.message]);
    });
  }, [socket]);

  return (
    <View style={{ flex: 1, paddingBottom: 5 }}>
      <ChatHeader
        onPress={() => {}}
        roomName={roomName}
        picture={picture}
        onlineStatus={
          type === "personal" ? (isOnline ? "Online" : "Offline") : "Hoạt động"
        }
        isOnline={isOnline}
        type={type}
        roomId={roomId}
      />
      {isLoading ? (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <MessagesList
          onSwipeToReply={swipeToReply}
          messages={messages?.length > 0 ? groupMessageByDate(messages) : []}
          fullName={fullName}
          type={type}
          roomId={roomId}
          isFollower={isFollower}
        />
      )}
      <ChatInput
        reply={reply}
        isLeft={isLeft}
        closeReply={closeReply}
        roomName={roomName}
        isFollower={isFollower}
        isFollowing={isFollowing}
        type={type}
        numberOfMessages={messages?.length}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});

export default MessagesScreen;
