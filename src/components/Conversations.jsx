import React, { useRef, useState } from "react";
import { ScrollView, Text, View, useWindowDimensions } from "react-native";

import ConversationItem from "./ConversationItem";
import { useEffect } from "react";
import { socket } from "../services/chatService";
import useAuthContext from "../hooks/useAuthContext";
import { parseMessageTime } from "../utils";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import { theme } from "../constants/theme";
import SearchInput from "./common/SearchInput";
import { useAppSelector } from "../app/hooks";

const Conversations = ({ children }) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const loggedUsers = [];
  const dispatch = useDispatch();
  const profile = useSelector((state) => state?.user?.profile?.data);
  const followData = useSelector((state) => state?.user?.data);

  const [onlineUsers, setOnlineUsers] = useState([]);
  const [userRooms, setUserRooms] = useState([]);
  const fullName = `${profile?.account?.firstname} ${profile?.account?.lastname}`;

  const accountSuggestionList = useAppSelector(
    (state) => state.account.accountSuggestionList
  );
  const accountFollowingList = useAppSelector(
    (state) => state.account.accountFollowingList
  );

  const HomeTab = () => (
    <View style={{ paddingHorizontal: 5, paddingVertical: 10 }}>
      <ScrollView>
        {/* Group renders */}
        {userRooms?.length > 0 &&
          userRooms?.map((room) => {
            if (room.type === "group") {
              if (room.isActive) {
                return (
                  <ConversationItem
                    key={room?.id}
                    roomId={room?.id}
                    picture={
                      room.type === "personal"
                        ? "https://images.pexels.com/photos/2078265/pexels-photo-2078265.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                        : ""
                    }
                    roomName={
                      room?.type === "personal"
                        ? room?.users.find(
                            (user) => user?.id !== profile?.account?.accountId
                          ).id
                        : room.name
                    }
                    fullName={fullName}
                    bio=""
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
                    isFriend={true}
                    members={room?.users}
                    isOnline={true}
                  />
                );
              }
            }
            if (room.type === "personal" && followData?.following?.length > 0) {
              const anotherUserArr = room?.users.filter(
                (user) => user?.id != profile?.account?.accountId
              );
              const foundIndex = followData?.following?.findIndex(
                (user) => user?.accountId == anotherUserArr[0].id
              );
              const foundUser = followData?.following[foundIndex];

              const userFullName = foundUser?.account?.firstname
                ? `${foundUser?.account?.firstname} ${foundUser?.account?.lastname}`
                : foundUser?.username;

              loggedUsers.push(anotherUserArr[0]?.id);
              const isFollower =
                followData?.followers.findIndex(
                  (follower) => follower?.accountId == foundUser?.accountId
                ) > -1;
              const isFollowing =
                followData?.following.findIndex(
                  (follow) => follow.accountId == foundUser?.accountId
                ) > -1;

              if (isFollowing) {
                return (
                  <ConversationItem
                    key={foundUser?.accountId}
                    roomId={foundUser?.accountId}
                    picture={foundUser?.avatar}
                    roomName={userFullName}
                    fullName={fullName}
                    foundUser={foundUser}
                    bio=""
                    type="personal"
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
                    isFollower={isFollower}
                    isFollowing={isFollowing}
                    isFriend={true}
                    members={[]}
                    isOnline={
                      onlineUsers.findIndex(
                        (onlUser) => foundUser?.accountId == onlUser.id
                      ) > -1
                    }
                  />
                );
              }
            }
          })}
        {/* User renders */}
        {followData?.following?.length > 0 &&
          followData?.following?.map((user) => {
            const userFullName = user?.account?.firstname
              ? `${user?.account?.firstname} ${user?.account?.lastname}`
              : user?.username;
            const isLogged =
              loggedUsers.findIndex((userId) => userId == user?.accountId) > -1;
            const isFollower =
              followData?.followers.findIndex(
                (follower) => follower.accountId == user.accountId
              ) > -1;
            const isFollowing =
              followData?.following.findIndex(
                (follow) => follow.accountId == user?.accountId
              ) > -1;

            if (!isLogged && isFollowing) {
              return (
                <ConversationItem
                  key={user?.accountId}
                  roomId={user?.accountId}
                  picture={user?.user?.avatar}
                  roomName={userFullName}
                  fullName={fullName}
                  bio=""
                  type="personal"
                  lastMessage=""
                  time=""
                  notification="3"
                  isBlocked
                  isMuted
                  // hasStory
                  isFriend={false}
                  members={[]}
                  isOnline={
                    onlineUsers.findIndex(
                      (onlUser) => user?.accountId == onlUser.id
                    ) > -1
                  }
                  isFollower={isFollower}
                  isFollowing={isFollowing}
                  foundUser={user}
                />
              );
            }
          })}
      </ScrollView>
    </View>
  );

  const WaitingTab = () => (
    <View style={{ paddingHorizontal: 5, paddingVertical: 10 }}>
      <ScrollView>
        {/* Group renders */}
        {userRooms?.length > 0 &&
          userRooms?.map((room) => {
            if (room.type === "personal" && followData?.following?.length > 0) {
              const anotherUserArr = room?.users.filter(
                (user) => user?.id != profile?.account?.accountId
              );
              const foundIndex = followData?.followers?.findIndex(
                (user) => user?.accountId == anotherUserArr[0].id
              );
              const foundUser = followData?.followers[foundIndex];

              const userFullName = foundUser?.account?.firstname
                ? `${foundUser?.account?.firstname} ${foundUser?.account?.lastname}`
                : foundUser?.username;

              loggedUsers.push(anotherUserArr[0]?.id);
              const isFollower =
                followData?.followers.findIndex(
                  (follower) => follower?.accountId == foundUser?.accountId
                ) > -1;
              const isFollowing =
                followData?.following.findIndex(
                  (follow) => follow.accountId == foundUser?.accountId
                ) > -1;
              if (!isFollowing && isFollower) {
                return (
                  <ConversationItem
                    key={foundUser?.accountId}
                    roomId={foundUser?.accountId}
                    picture={foundUser?.avatar}
                    roomName={userFullName}
                    fullName={fullName}
                    bio=""
                    type="personal"
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
                    isFollower={isFollower}
                    isFollowing={isFollowing}
                    isFriend={true}
                    members={[]}
                    isOnline={
                      onlineUsers.findIndex(
                        (onlUser) => foundUser?.accountId == onlUser.id
                      ) > -1
                    }
                  />
                );
              }
            }
          })}
        {/* User renders */}
        {followData?.followers?.length > 0 &&
          followData?.followers?.map((user) => {
            const userFullName = user?.account?.firstname
              ? `${user?.account?.firstname} ${user?.account?.lastname}`
              : user?.username;
            const isFollower =
              followData?.followers.findIndex(
                (follower) => follower?.accountId == user?.accountId
              ) > -1;
            const isFollowing =
              followData?.following.findIndex(
                (follow) => follow.accountId == user?.accountId
              ) > -1;
            const isLogged =
              loggedUsers.findIndex((userId) => userId == user?.accountId) > -1;
            if (isFollower && !isLogged) {
              return (
                <ConversationItem
                  key={user?.accountId}
                  roomId={user?.accountId}
                  picture={user?.avatar}
                  roomName={userFullName}
                  fullName={fullName}
                  bio=""
                  type="personal"
                  lastMessage=""
                  time=""
                  notification="3"
                  isBlocked
                  isMuted
                  // hasStory
                  isFriend={false}
                  members={[]}
                  isOnline={
                    onlineUsers.findIndex(
                      (onlUser) => user?.accountId === onlUser?.id
                    ) > -1
                  }
                  isFollowing={isFollowing}
                />
              );
            }
          })}
      </ScrollView>
    </View>
  );
  const [routes] = useState([
    { key: "first", title: "Chính" },
    { key: "second", title: "Chờ" },
  ]);

  const fetchAllAccountSuggestionForCheck = async () => {
    await dispatch(getSuggestionAccount()).then((res) => {});
  };

  const fetchAllFetFollowingAccountWithPosts = async () => {
    await dispatch(getFollowingAccountWithPosts()).then((res) => {});
  };

  useEffect(() => {
    if (profile) {
      socket.emit(
        "login",
        {
          id: profile?.account?.accountId,
          name: profile?.account.firstname
            ? fullName
            : profile?.account?.username,
        },
        (response) => {
          if (response.error) {
            console.log("err", response.error);
          }
        }
      );
    }
  }, []);

  const fetch = async () => {
    await fetchAllAccountSuggestionForCheck();
    await fetchAllFetFollowingAccountWithPosts();
  };

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

  useEffect(() => {
    fetch();
  }, []);

  return (
    <>
      {children}
      <SearchInput value={searchValue} setValue={setSearchValue} />
      {profile ? (
        <TabView
          renderTabBar={(props) => (
            <TabBar
              {...props}
              labelStyle={{
                color: theme.colors.primary,
              }}
              activeColor={theme.colors.messageBackground}
              indicatorStyle={{
                color: theme.colors.primary,
              }}
              style={{
                backgroundColor: "white",
              }}
            />
          )}
          navigationState={{ index, routes }}
          onIndexChange={setIndex}
          renderScene={SceneMap({
            first: HomeTab,
            second: WaitingTab,
          })}
        />
      ) : (
        <Text style={{ textAlign: "center" }}>
          Đăng nhập để có thể trò chuyện.
        </Text>
      )}
    </>
  );
};

export default Conversations;
