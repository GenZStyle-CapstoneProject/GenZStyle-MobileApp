import React, { useCallback, useState } from "react";
import {
  RefreshControl,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from "react-native";

import ConversationItem from "./ConversationItem";
import { useEffect } from "react";
import { socket } from "../services/chatService";
import { parseMessageTime } from "../utils";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import { theme } from "../constants/theme";
import SearchInput from "./common/SearchInput";
import { useAppSelector } from "../app/hooks";
import {
  getFollowingAccountWithPosts,
  getSuggestionAccount,
} from "../app/Account/actions";
import { fecthListFollow } from "../features/userSlice";

const Conversations = ({ children }) => {
  const layout = useWindowDimensions();
  const dispatch = useDispatch();
  const [index, setIndex] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const loggedUsers = [];
  const profile = useSelector((state) => state?.user?.profile?.data);
  const followData = useSelector((state) => state?.user?.data);
  const [availableChats, setAvailableChats] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [userRooms, setUserRooms] = useState([]);
  const fullName = `${profile?.account?.firstname} ${profile?.account?.lastname}`;
  const [refreshing, setRefreshing] = useState(false);

  const HomeTab = () => (
    <View style={{ paddingHorizontal: 5, paddingVertical: 10 }}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {searchValue != "" ? (
          <>
            {availableChats.length > 0 &&
              availableChats.map((chat) => {
                const userFullName = chat?.account?.firstname
                  ? `${chat?.account?.firstname} ${chat?.account?.lastname}`
                  : chat?.username;
                const isFollower =
                  followData?.followers.findIndex(
                    (follower) => follower.accountId == chat.accountId
                  ) > -1;
                const isFollowing =
                  followData?.following.findIndex(
                    (follow) => follow.accountId == chat?.accountId
                  ) > -1;

                if (
                  userFullName
                    ?.trim()
                    ?.toLowerCase()
                    ?.includes(searchValue.toLowerCase())
                ) {
                  return (
                    <ConversationItem
                      key={chat?.id}
                      roomId={chat?.accountId}
                      picture={chat.avatar}
                      roomName={userFullName}
                      fullName={fullName}
                      foundUser={chat}
                      bio=""
                      type="personal"
                      lastMessage={""}
                      time={""}
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
                          (onlUser) => chat?.accountId == onlUser.id
                        ) > -1
                      }
                    />
                  );
                }
              })}
          </>
        ) : (
          <>
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
                                (user) =>
                                  user?.id !== profile?.account?.accountId
                              ).id
                            : room.name
                        }
                        fullName={fullName}
                        bio=""
                        type={room?.type}
                        lastMessage={room?.lastMessage?.text}
                        time={
                          room?.lastMessage &&
                          room?.lastMessage.time?.length > 0
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
                if (
                  room.type === "personal" &&
                  followData?.following?.length > 0
                ) {
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
                    if (
                      availableChats.findIndex(
                        (chat) => chat.accountId === foundUser?.accountId
                      ) < 0
                    ) {
                      availableChats.push(foundUser);
                    }
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
                          room?.lastMessage &&
                          room?.lastMessage.time?.length > 0
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
                  loggedUsers.findIndex((userId) => userId == user?.accountId) >
                  -1;
                const isFollower =
                  followData?.followers.findIndex(
                    (follower) => follower.accountId == user.accountId
                  ) > -1;
                const isFollowing =
                  followData?.following.findIndex(
                    (follow) => follow.accountId == user?.accountId
                  ) > -1;

                if (!isLogged && isFollowing) {
                  if (
                    availableChats.findIndex(
                      (chat) => chat.accountId === user?.accountId
                    ) < 0
                  ) {
                    availableChats.push(user);
                  }
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
          </>
        )}
      </ScrollView>
    </View>
  );

  const WaitingTab = () => (
    <View style={{ paddingHorizontal: 5, paddingVertical: 10 }}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {searchValue != "" ? (
          <>
            {availableChats.length > 0 &&
              availableChats.map((chat) => {
                const userFullName = chat?.account?.firstname
                  ? `${chat?.account?.firstname} ${chat?.account?.lastname}`
                  : chat?.username;
                const isFollower =
                  followData?.followers.findIndex(
                    (follower) => follower.accountId == chat.accountId
                  ) > -1;
                const isFollowing =
                  followData?.following.findIndex(
                    (follow) => follow.accountId == chat?.accountId
                  ) > -1;

                if (
                  userFullName
                    ?.trim()
                    ?.toLowerCase()
                    ?.includes(searchValue.toLowerCase())
                ) {
                  return (
                    <ConversationItem
                      key={chat?.id}
                      roomId={chat?.accountId}
                      picture={chat.avatar}
                      roomName={userFullName}
                      fullName={fullName}
                      foundUser={chat}
                      bio=""
                      type="personal"
                      lastMessage={""}
                      time={""}
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
                          (onlUser) => chat?.accountId == onlUser.id
                        ) > -1
                      }
                    />
                  );
                }
              })}
          </>
        ) : (
          <>
            {/* Group renders */}
            {userRooms?.length > 0 &&
              userRooms?.map((room) => {
                if (
                  room.type === "personal" &&
                  followData?.following?.length > 0
                ) {
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
                    if (
                      availableChats.findIndex(
                        (chat) => chat.accountId === foundUser?.accountId
                      ) < 0
                    ) {
                      availableChats.push(foundUser);
                    }
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
                          room?.lastMessage &&
                          room?.lastMessage.time?.length > 0
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
                        foundUser={foundUser}
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
                  loggedUsers.findIndex((userId) => userId == user?.accountId) >
                  -1;
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
                      foundUser={user}
                    />
                  );
                }
              })}
          </>
        )}
      </ScrollView>
    </View>
  );
  const [routes] = useState([
    { key: "first", title: "Chính" },
    { key: "second", title: "Chờ" },
  ]);

  const fetchFollowData = async () => {
    await dispatch(fecthListFollow()).then((res) => {});
  };

  const fetchAllFollowingAccountWithPosts = async () => {
    await dispatch(getFollowingAccountWithPosts()).then((res) => {});
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetch();
    socket.emit("get_rooms");
    setRefreshing(false);
  }, []);

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
    await fetchFollowData();
  };

  const getUserRooms = async () => {
    socket.on("user_rooms", (data) => {
      data.sort(function (a, b) {
        return b.lastMessage.id - a.lastMessage.id;
      });
      setUserRooms(data);
    });
  };

  useEffect(() => {
    socket.on("online_users", (data) => {
      setOnlineUsers(data);
    });
  }, [socket]);

  useEffect(() => {
    getUserRooms();
  }, [socket, followData]);

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
