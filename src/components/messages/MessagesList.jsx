import React, { useRef } from "react";
import { ScrollView, View, Text } from "react-native";

import Message from "./Message";

import { theme } from "../../constants/theme";
import { useAppSelector } from "../../app/hooks";
import { useEffect } from "react";
import { socket } from "../../services/chatService";
import { useState } from "react";

const MessagesList = ({ onSwipeToReply, messages, fullName, type, roomId }) => {
  const scrollView = useRef();
  const profile = useAppSelector((state) => state.user.profile?.data);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    socket.emit("get_group_members", {
      roomId: roomId,
    });
  }, []);

  useEffect(() => {
    socket.on("group_members", (data) => {
      setMembers(data);
    });
  }, [socket]);

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.white, flex: 1 }}
      ref={(ref) => (scrollView.current = ref)}
      onContentChange={() => {
        scrollView.current.scrollToEnd({ animated: true });
      }}
    >
      {type === "group" ? (
        messages.length > 0 && members.length > 0 ? (
          messages.map((messageGroup) => (
            <View key={messageGroup.key}>
              <Text style={{ textAlign: "center", padding: 12 }}>
                {messageGroup.key}
              </Text>
              {messageGroup.values?.map((message, index) => (
                <Message
                  key={index}
                  time={message.time}
                  isLeft={message.name !== profile?.account?.accountId}
                  message={message.text}
                  onSwipe={onSwipeToReply}
                  name={
                    members.find(
                      (member) =>
                        member?.id.toString() === message?.name.toString()
                    )?.name
                  }
                  type={type}
                />
              ))}
            </View>
          ))
        ) : (
          <Text style={{ textAlign: "center", padding: 12 }}>
            {"No message yet. Say hi!"}
          </Text>
        )
      ) : (
        messages.length > 0 &&
        messages.map((messageGroup) => (
          <View key={messageGroup.key}>
            <Text style={{ textAlign: "center", padding: 12 }}>
              {messageGroup.key}
            </Text>
            {messageGroup.values?.map((message, index) => (
              <Message
                key={index}
                time={message.time}
                isLeft={message.name !== profile?.account?.accountId}
                message={message.text}
                onSwipe={onSwipeToReply}
                name={
                  members.find(
                    (member) =>
                      member?.id.toString() === message?.name.toString()
                  )?.name
                }
                type={type}
              />
            ))}
          </View>
        ))
      )}
    </ScrollView>
  );
};

export default MessagesList;
