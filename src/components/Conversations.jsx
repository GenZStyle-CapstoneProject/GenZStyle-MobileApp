import React, { useState } from "react";
import { ScrollView } from "react-native";

import ConversationItem from "./ConversationItem";
import { useEffect } from "react";
import { socket } from "../services/chatService";
import useAuthContext from "../hooks/useAuthContext";
import { parseMessageTime } from "../utils";
import axios from "axios";
import { useSelector } from "react-redux";

const Conversations = ({ children }) => {
  const { currentUser } = useAuthContext();
  const profile = useSelector((state) => state.user.profile?.data);
  const [onlineUser, setOnlineUsers] = useState([]);
  const [userRooms, setUserRooms] = useState([]);

  useEffect(() => {
    if (profile) {
      socket.emit(
        "login",
        {
          id: profile?.account?.accountId,
          name: `${profile?.account?.firstname} ${profile?.account?.lastname}`,
        },
        (response) => {
          if (response.error) {
            console.log("err", response.error);
          }
        }
      );
    }
  }, []);

  useEffect(() => {
    socket.on("online_users", (data) => {
      setOnlineUsers(data);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("user_rooms", (data) => {
      setUserRooms(data);
    });
  }, [socket]);

  return (
    <ScrollView>
      {children}
      {userRooms.length > 0 &&
        userRooms?.map((room) => (
          <ConversationItem
            key={room?.id}
            roomId={room?.id}
            picture={
              room.type === "personal"
                ? "https://images.pexels.com/photos/2078265/pexels-photo-2078265.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                : ""
            }
            username={
              room?.type === "personal"
                ? room.users.find((user) => user.id !== currentUser.username).id
                : room.name
            }
            bio="my name is Mercy Patrick"
            type={room?.type}
            lastMessage={room?.lastMessage?.text}
            time={
              room?.lastMessage && room?.lastMessage.time?.length > 0
                ? parseMessageTime(room?.lastMessage?.time)
                : ""
            }
            notification="3"
            isBlocked
            isMuted
            // hasStory
            members={room.users}
            isOnline={onlineUser.findIndex((user) => user.id === "user-2") > -1}
          />
        ))}

      {/* <ConversationItem
        picture="https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        username="Nina Gomez"
        bio="my name is Mercy Patrick"
        lastMessage="Hello there"
        time="4:00 PM"
        isBlocked
        isMuted
        isOnline={onlineUser.findIndex((user) => user.id === "") > -1}
      />

      <ConversationItem
        picture="https://images.pexels.com/photos/5486199/pexels-photo-5486199.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        username="Jack Randolph"
        bio="my name is Mercy Patrick"
        lastMessage="Hello there"
        time="4:00 PM"
        isBlocked
        isMuted
      />

      <ConversationItem
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
  );
};

export default Conversations;
