import React, { useRef } from "react";
import { ScrollView, View, Text } from "react-native";

import Message from "./Message";

import { theme } from "../../constants/theme";
import { useAppSelector } from "../../app/hooks";
import { useEffect } from "react";
import { socket } from "../../services/chatService";
import { useState } from "react";

const MessagesList = ({
  onSwipeToReply,
  messages,
  fullName,
  type,
  roomId,
  isFollower,
}) => {
  const profile = useAppSelector((state) => state.user.profile?.data);
  const [members, setMembers] = useState([]);
  const scrollViewRef = useRef();
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
      ref={scrollViewRef}
      nestedScrollEnabled={true}
      onContentSizeChange={(contentWidth, contentHeight) => {
        scrollViewRef.current?.scrollTo({ y: contentHeight });
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
                  isLeft={message.name != profile?.account?.accountId}
                  message={message.text}
                  image={message.image}
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
            {"Chưa có tin nhắn, chào cái nào!"}
          </Text>
        )
      ) : messages.length > 0 ? (
        messages.map((messageGroup) => (
          <View key={messageGroup.key}>
            <Text style={{ textAlign: "center", padding: 12 }}>
              {messageGroup.key}
            </Text>
            {messageGroup.values?.map((message, index) => (
              <Message
                key={index}
                time={message.time}
                isLeft={message.name != profile?.account?.accountId}
                message={message.text}
                image={message.image}
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
          {"Chưa có tin nhắn, chào cái nào!"}
        </Text>
      )}
    </ScrollView>
  );
};

export default MessagesList;
