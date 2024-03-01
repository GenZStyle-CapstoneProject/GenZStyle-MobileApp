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
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const [isLiked, setIsLiked] = useState(false);
  const [dataActivePost, setDataActivePost] = useState();
  const dataActive = useSelector((state) => state.activePost.dataActivePost);

  const handleLikePress = () => {
    setIsLiked(!isLiked);
  };
  const dispatch = useDispatch();
  const navigateToListLike = () => {
    navigation.navigate("ListLike");
  };

  // const fetchAllPosts = async () => {
  //     try {
  //         const response = await axios.get('https://genzstyleappapi20240126141439.azurewebsites.net/odata/Posts/Active/Post');
  //         console.log('Axios Response:', response.data);

  //         if (Array.isArray(response.data)) {
  //             setPosts(response.data);
  //         } else if (Array.isArray(response.data.value)) {
  //             setPosts(response.data.value);
  //         } else {
  //             console.error('Invalid response format. Expected an array.');
  //         }

  //         setLoading(false);
  //     } catch (error) {
  //         console.error('Error fetching posts:', error);
  //         console.error('Error details:', error.response?.data);
  //     }
  // };
  // useEffect(() => {
  //   dispatch(fecthActivePost()).then((result) => {
  //     if (result.payload) {
  //       console.log("Data received:", result.payload);
  //       const data = result.payload;
  //       setDataActivePost(data);
  //     } else {
  //       console.log("Error received");
  //     }
  //   });
  // }, []);

  useFocusEffect(
    useCallback(() => {
      dispatch(fecthActivePost()).then((result) => {
        if (result.payload) {
          console.log("Data received:", result.payload);
          const data = result.payload;
          setDataActivePost(data);
        } else {
          console.log("Error received");
        }
      });
    }, [])
  );

  const renderItem = ({ item }) => (
    <View key={item.postId} style={styles.postContainer}>
      <TouchableOpacity
        onPress={() => navigation.navigate("CartDetail", { item })}
      >
        <Image source={{ uri: item.image }} style={styles.postImage} />
        <View style={styles.postFooter}>
          <View style={styles.iconContainer}>
            <TouchableOpacity style={styles.icon} onPress={handleLikePress}>
              <Icon
                name={isLiked ? "heart" : "heart-outline"}
                size={24}
                color={isLiked ? "red" : "black"}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon} onPress={navigateToListLike}>
              <Text style={styles.iconText}>24</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon}>
              <Icon name="chat-outline" size={24} color="black" />
              <Text style={styles.iconText}></Text>
            </TouchableOpacity>
          </View>
          <View style={styles.textContainer}>
            <View style={styles.textRow}>
              <Text style={styles.titleText}>{item.content}</Text>
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
    margin: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
