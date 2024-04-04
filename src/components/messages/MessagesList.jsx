import React, { useRef } from "react";
import { ScrollView, View, Text } from "react-native";

import Message from "./Message";

import { theme } from "../../constants/theme";

const MessagesList = ({ onSwipeToReply, messages, currentName, type }) => {
  const scrollView = useRef();
  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.white, flex: 1 }}
      ref={(ref) => (scrollView.current = ref)}
      onContentChange={() => {
        scrollView.current.scrollToEnd({ animated: true });
      }}
    >
      {messages.length > 0 ? (
        messages.map((messageGroup) => (
          <View key={messageGroup.key}>
            <Text style={{ textAlign: "center", padding: 12 }}>
              {messageGroup.key}
            </Text>
            {messageGroup.values?.map((message, index) => (
              <Message
                key={index}
                time={message.time}
                isLeft={message.name !== currentName}
                message={message.text}
                onSwipe={onSwipeToReply}
                name={message.name}
                type={type}
              />
            ))}
          </View>
        ))
      ) : (
        <Text style={{ textAlign: "center", padding: 12 }}>
          {"No message yet. Say hi!"}
        </Text>
      )}
    </ScrollView>
  );
};

export default MessagesList;
