
import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import { fecthActivePost } from "../../app/ActivePost/action";
import { FlatList } from "react-native";


const Cart = ({ item }) => {
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const [dataActivePost, setDataActivePost] = useState();
  const [likedPosts, setLikedPosts] = useState([]);
  const dataActive = useSelector((state) => state.activePost.dataActivePost);
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      dispatch(fecthActivePost()).then((result) => {
        if (result.payload) {
          console.log("Data received:", result.payload);
          const data = result.payload.map(post => ({
            ...post,
            isLiked: false,
          }));
          setDataActivePost(data);
          setLikedPosts([]);
        } else {
          console.log("Error received");
        }
      });
    }, [])
  );

  const handleLikePress = (postId) => {

    const index = dataActive.findIndex((post) => post.postId === postId);


    setDataActivePost((prevData) => {
      const newData = [...prevData];
      newData[index] = {
        ...newData[index],
        isLiked: !newData[index]?.isLiked,
      };
      return newData;
    });


    setLikedPosts((prevLikedPosts) => {
      if (prevLikedPosts.includes(postId)) {
        return prevLikedPosts.filter((id) => id !== postId);
      } else {
        return [...prevLikedPosts, postId];
      }
    });
  };

  const navigateToListLike = (postId) => {
    const post = dataActive.find((p) => p.postId === postId);
    if (post) {
      navigation.navigate("ListLike", {
        dataLike: post,
      });
    }
  };

  const renderItem = ({ item }) => (
    <View key={item.postId} style={styles.postContainer}>
      <TouchableOpacity onPress={() => navigation.navigate("CartDetail", { item })}>
        <Image source={{ uri: item.image }} style={styles.postImage} />
        <View style={styles.postFooter}>
          <View style={styles.iconContainer}>
            <TouchableOpacity
              style={styles.icon}
              onPress={() => handleLikePress(item.postId)}
            >

              {/* <Icon
                
                name={item.isLiked ? "cards-heart" : "cards-heart-outline"}
                size={24}
                style={[
                  styles.icon,
                  likedPosts.includes(item.postId) && styles.redHeartIcon

                ]}
              /> */}
              <Icon
                name={item.isLiked ? "heart" : "heart-outline"}
                size={24}
                style={[
                  styles.icon,
                  likedPosts.includes(item.postId) && { color: "red" }
                ]}
              />



            </TouchableOpacity>
            <TouchableOpacity
              style={styles.icon}
              onPress={() => navigateToListLike(item.postId)}
            >
              <Text style={styles.iconText}>{item.likes.length}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon}>
              <Icon name="chat-outline" size={24} color="black" />
              <Text style={styles.iconText}></Text>
            </TouchableOpacity>
          </View>
          <View style={styles.textContainer}>
            <View style={styles.textRow}>
              <Text numberOfLines={2} ellipsizeMode="tail" style={styles.titleText}>
                {item.content}
              </Text>
            </View>
            <View style={styles.textRow}>
              <Text style={styles.hashtagText}>{item.hashtag}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View>
      <FlatList
        height={"90%"}
        data={dataActive}
        keyExtractor={(item) => item.postId.toString()}
        renderItem={renderItem}
        numColumns={2}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  postContainerScrollView: {
    marginLeft: 5,
    marginRight: 5,
    paddingHorizontal: 0,
    paddingVertical: 20,
    overflow: "hidden",
  },
  postContainer: {
    padding: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  postImage: {
    width: 185,
    height: 232,
    resizeMode: "cover",
  },

  postFooter: {
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 10,
  },
  iconContainer: {
    flexDirection: "row",
  },
  icon: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,

  },
  iconText: {
    marginLeft: 5,
  },
  textContainer: {
    marginLeft: 10,
    flexDirection: "column",
  },
  textRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 5,
    marginLeft: -10,
    flex: 1,
  },
  hashtagText: {
    color: "black",
    marginTop: 5,
    marginLeft: -10,
  },
  commentText: {
    color: "black",
    marginTop: 5,
  },

});

export default Cart;
