import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const likeData = [
  {
    id: "1",
    username: "user1",
    avatar:
      "https://preview.redd.it/trying-to-come-up-with-a-new-avatar-for-my-various-social-v0-i3kyoe6e1lsb1.jpg?width=519&format=pjpg&auto=webp&s=af4100e59c80d5e8847b64f0ca68fa76e36547e5",
  },
  {
    id: "2",
    username: "user2",
    avatar:
      "https://preview.redd.it/trying-to-come-up-with-a-new-avatar-for-my-various-social-v0-wby69l6e1lsb1.jpg?width=519&format=pjpg&auto=webp&s=61341c3ce447f8356da3146c1903395fc43d28dc",
  },
  {
    id: "3",
    username: "user3",
    avatar:
      "https://preview.redd.it/trying-to-come-up-with-a-new-avatar-for-my-various-social-v0-i3kyoe6e1lsb1.jpg?width=519&format=pjpg&auto=webp&s=af4100e59c80d5e8847b64f0ca68fa76e36547e5",
  },
  {
    id: "4",
    username: "user4",
    avatar:
      "https://preview.redd.it/trying-to-come-up-with-a-new-avatar-for-my-various-social-v0-wby69l6e1lsb1.jpg?width=519&format=pjpg&auto=webp&s=61341c3ce447f8356da3146c1903395fc43d28dc",
  },
  {
    id: "5",
    username: "user5",
    avatar:
      "https://preview.redd.it/trying-to-come-up-with-a-new-avatar-for-my-various-social-v0-i3kyoe6e1lsb1.jpg?width=519&format=pjpg&auto=webp&s=af4100e59c80d5e8847b64f0ca68fa76e36547e5",
  },
  {
    id: "6",
    username: "user6",
    avatar:
      "https://preview.redd.it/trying-to-come-up-with-a-new-avatar-for-my-various-social-v0-wby69l6e1lsb1.jpg?width=519&format=pjpg&auto=webp&s=61341c3ce447f8356da3146c1903395fc43d28dc",
  },
  {
    id: "7",
    username: "user7",
    avatar:
      "https://preview.redd.it/trying-to-come-up-with-a-new-avatar-for-my-various-social-v0-i3kyoe6e1lsb1.jpg?width=519&format=pjpg&auto=webp&s=af4100e59c80d5e8847b64f0ca68fa76e36547e5",
  },
  {
    id: "8",
    username: "user8",
    avatar:
      "https://preview.redd.it/trying-to-come-up-with-a-new-avatar-for-my-various-social-v0-wby69l6e1lsb1.jpg?width=519&format=pjpg&auto=webp&s=61341c3ce447f8356da3146c1903395fc43d28dc",
  },
];
const BackButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.backButton}>
    <Ionicons name="arrow-back" size={24} color="black" />
  </TouchableOpacity>
);
const ListLike = ({ route }) => {
  const navigation = useNavigation();
  const { dataLike } = route.params;
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(likeData);
  console.log("Data like", dataLike);
  const handleSearch = (query) => {
    setSearchQuery(query);
    const lowerCaseQuery = query.toLowerCase();
    const filtered = likeData.filter((item) =>
      item.username.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredData(filtered);
  };

  const accountData = dataLike.likes.map((like) => like.account);
  const renderLikeItem = ({ item }) => (
    <View style={styles.followerItem}>
      <Image source={{ uri: item?.avatar }} style={styles.avatar} />
      <Text style={styles.username}>{item?.username}</Text>
      <TouchableOpacity style={styles.followButton}>
        <Text style={styles.followButtonText}>Theo dõi</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackButton onPress={() => navigation.goBack()} />
        <Text style={styles.title}>Lượt thích</Text>
      </View>
      <View style={styles.searchContainer}>
        <Ionicons
          name="search-outline"
          size={24}
          color="#888"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm"
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
      <FlatList
        data={accountData}
        keyExtractor={(item) => item?.accountId.toString()}
        renderItem={renderLikeItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    marginTop: 20,
  },
  backButton: {
    position: "absolute",
    left: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  followerItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 26,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
  },
  followButton: {
    backgroundColor: "#FF5C5C",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  followButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F3F3",
    borderRadius: 8,
    marginHorizontal: 16,
    marginTop: 10,
  },
  searchIcon: {
    marginLeft: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    paddingLeft: 10,
    fontSize: 16,
    color: "#333",
  },
});

export default ListLike;
