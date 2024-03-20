// import React, { useState, useCallback } from "react";
// import {
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
//   RefreshControl,
// } from "react-native";
// import Icon from "react-native-vector-icons/MaterialCommunityIcons";
// import { useFocusEffect, useNavigation } from "@react-navigation/native";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchMyPost } from "../../app/MyPost/action";
// import { FlatList } from "react-native";
// import EmptyResult from "../Search/EmptyResult";
// import { fecthListFollow, getProfile } from "../../features/userSlice";

// const MyPostsScreen = () => {
//   const [loading, setLoading] = useState(true);
//   const navigation = useNavigation();
//   const [dataPost, setDataMyPost] = useState([]);
//   const accountId = useSelector((state) => state.user.accountId);
//   console.log("accountId cua toi ", accountId);
//   const [likedPosts, setLikedPosts] = useState([]);
//   const dataMyPost = useSelector((state) => state.fetchMyPost?.posts);
//   const dispatch = useDispatch();
//   const navigateToCartDetail = (item) => {
//     // Chuyển đến màn hình CartDetail và truyền postId
//     navigation.navigate("CartDetail", { item });
//   };
//   useFocusEffect(
//     useCallback(() => {
//       dispatch(fetchMyPost(accountId || 0)).then((result) => {
//         console.log("Action payload:", JSON.stringify(result, null, 2));

//         if (result.payload) {
//           setDataMyPost(result.payload.posts);
//           setLikedPosts([]);
//         } else {
//           console.log("Error received:", result.error);
//         }
//       });
//     }, [accountId])
//   );
//   const [refreshing, setRefresing] = useState(false);
//   const onRefresh = useCallback(() => {
//     setRefresing(true);
//     const fetchData = async () => {
//       // const accessToken = await AsyncStorage.getItem("ACCESS_TOKEN");
//       // console.log("userInfo", accountId);
//       await dispatch(getProfile(accountId || 0)).then((res) => {
//         console.log(JSON.stringify(res, null, 2));
//       });
//     };
//     const fecthFollow = async () => {
//       // const accessToken = await AsyncStorage.getItem("ACCESS_TOKEN");

//       try {
//         await dispatch(fecthListFollow());
//       } catch (error) {
//         // Handle the error or implement a retry mechanism
//         console.error("Error in fecthFollow:", error);
//       }
//     };

//     const fetchAsync = async () => {
//       await fetchData();
//       await fecthFollow();
//       setRefresing(false);
//     };

//     fetchAsync();
//     setRefresing(false);
//   }, [accountId]);
//   const renderItem = ({ item }) => {
//     console.log("itemmmmm:", item);
//     return (
//       <View key={item.postId} style={styles.postContainer}>
//         <TouchableOpacity onPress={() => navigateToCartDetail(item)}>
//           <Image source={{ uri: item.image }} style={styles.postImage} />

//           <View style={styles.postFooter}>
//             <View style={styles.iconContainer}>
//               <TouchableOpacity style={styles.icon}>
//                 <Icon
//                   name={item.isLiked ? "heart" : "heart-outline"}
//                   size={24}
//                   style={[
//                     styles.icon,
//                     likedPosts.includes(item.postId) && { color: "red" },
//                   ]}
//                 />

//               </TouchableOpacity>
//               <TouchableOpacity style={styles.icon}>

//                 <Text style={styles.iconText}>{item.likes.length}</Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.icon}>
//                 <Icon name="chat-outline" size={24} color="black" />
//                 <Text style={styles.iconText}>{item.comments}</Text>
//               </TouchableOpacity>
//             </View>

//             <View style={styles.textContainer}>
//               <Text numberOfLines={2} ellipsizeMode="tail" style={styles.titleText}>
//                 {item.content}
//               </Text>

//               {item.hashPosts.map((hashPost, index) => (
//                 <Text key={index} style={styles.hashtagText}>
//                   {hashPost?.hashtag?.name}
//                 </Text>
//               ))}
//             </View>
//           </View>
//         </TouchableOpacity>
//       </View>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={dataMyPost}
//         keyExtractor={(item) => item.postId.toString()}
//         renderItem={renderItem}
//         numColumns={2}
//         ListEmptyComponent={EmptyResult}
//         refreshControl={
//           <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//         }
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#ffffff",
//     padding: 16,
//   },
//   postContainer: {
//     marginBottom: 16,
//     marginRight: 16,
//     width: "48%",
//     borderRadius: 8,
//     overflow: "hidden",
//   },
//   postImage: {
//     width: "100%",
//     height: 200,
//     resizeMode: "cover",
//     borderRadius: 8,
//   },
//   postFooter: {
//     flexDirection: "column",
//     alignItems: "flex-start",
//     padding: 8,
//     backgroundColor: "#f9f9f9",
//   },
//   iconContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 2,
//   },
//   icon: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginRight: 8,
//     backgroundColor: "rgba(255, 255, 255, 0.8)",
//     borderRadius: 20,
//     padding: 8,
//   },
//   iconText: {
//     marginLeft: 4,
//     color: "#333333",
//   },
//   textContainer: {
//     marginLeft: 8,
//   },
//   titleText: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#333333",
//     // marginBottom: 4,
//   },
//   hashtagText: {
//     color: "#666666",
//   },
// });

// export default MyPostsScreen;
// import React, { useState, useCallback, useEffect } from "react";
// import {
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
//   RefreshControl,
// } from "react-native";
// import Icon from "react-native-vector-icons/MaterialCommunityIcons";
// import { useFocusEffect, useNavigation } from "@react-navigation/native";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchMyPost } from "../../app/MyPost/action";
// import { fetchLikePost } from "./../../app/LikePost/action";
// import { FlatList } from "react-native";
// import EmptyResult from "../Search/EmptyResult";

// const MyPostsScreen = () => {
//   const navigation = useNavigation();
//   const [dataPost, setDataMyPost] = useState([]);
//   const accountId = useSelector((state) => state.user.accountId);
//   const [likedPosts, setLikedPosts] = useState([]);
//   const dataMyPost = useSelector((state) => state.fetchMyPost?.posts);

//   const dispatch = useDispatch();

//   useFocusEffect(
//     useCallback(() => {
//       dispatch(fetchMyPost(accountId || 0)).then((result) => {
//         if (result.payload) {

//           setDataMyPost(result.payload.posts);
//           setLikedPosts([]);
//         } else {
//           console.log("Error received:", result.error);
//         }
//       });
//     }, [accountId])
//   );


//   // useEffect(() => {
//   //   // Cập nhật likedPosts dựa trên trạng thái isLiked của các bài viết
//   //   const updatedLikedPosts = dataMyPost
//   //     .filter((post) => post.isLiked)
//   //     .map((post) => post.postId);
//   //   setLikedPosts(updatedLikedPosts);
//   // }, [dataMyPost]);

//   const handleLikePress = async (postId) => {
//     try {
//       // Gửi yêu cầu like bài viết đến server
//       await dispatch(fetchLikePost({ postId }));

//       // Tìm kiếm bài viết trong dataMyPost và cập nhật trạng thái like
//       const updatedPosts = dataMyPost.map((post) => {
//         if (post.postId === postId) {
//           return {
//             ...post,
//             isLiked: !post.isLiked,
//           };
//         }
//         return post;
//       });

//       // Cập nhật dataMyPost với trạng thái like mới
//       setDataMyPost(updatedPosts);
//       console.log("updatedPosts:", updatedPosts);

//       // Cập nhật trạng thái likedPosts để hiển thị màu đỏ ngay lập tức
//       setLikedPosts((prevLikedPosts) => {
//         if (prevLikedPosts.includes(postId)) {
//           return prevLikedPosts.filter((id) => id !== postId);
//         } else {
//           return [...prevLikedPosts, postId];
//         }
//       });
//     } catch (error) {
//       console.error("Error dispatching likePost:", error.message);
//     }
//   };


//   const navigateToCartDetail = (item) => {
//     navigation.navigate("CartDetail", { item });
//   };

//   const renderItem = ({ item }) => {
//     return (
//       <View key={item.postId} style={styles.postContainer}>
//         <TouchableOpacity onPress={() => navigateToCartDetail(item)}>
//           <Image source={{ uri: item.image }} style={styles.postImage} />

//           <View style={styles.postFooter}>
//             <View style={styles.iconContainer}>
//               <TouchableOpacity
//                 style={styles.icon}
//                 onPress={() => handleLikePress(item.postId)}
//               >
//                 <Icon
//                   name={
//                     item.likes.some(
//                       (like) => like.isLike === true && like.likeBy == accountId
//                     )
//                       ? "heart"
//                       : "heart-outline"
//                   }
//                   size={24}
//                   style={{
//                     color: item.likes.some(
//                       (like) => like.isLike === true && like.likeBy == accountId
//                     )
//                       ? "red"
//                       : "black",
//                   }}
//                 />
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.icon}>
//                 <Text style={styles.iconText}>{item.likes.length}</Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.icon}>
//                 <Icon name="chat-outline" size={24} color="black" />
//                 <Text style={styles.iconText}>{item.comments}</Text>
//               </TouchableOpacity>
//             </View>

//             <View style={styles.textContainer}>
//               <Text
//                 numberOfLines={2}
//                 ellipsizeMode="tail"
//                 style={styles.titleText}
//               >
//                 {item.content}
//               </Text>

//               {item.hashPosts.map((hashPost, index) => (
//                 <Text key={index} style={styles.hashtagText}>
//                   {hashPost?.hashtag?.name}
//                 </Text>
//               ))}
//             </View>
//           </View>
//         </TouchableOpacity>
//       </View>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={dataMyPost}
//         keyExtractor={(item) => item.postId.toString()}
//         renderItem={renderItem}
//         numColumns={2}
//         ListEmptyComponent={EmptyResult}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#ffffff",
//     padding: 16,
//   },
//   postContainer: {
//     marginBottom: 16,
//     marginRight: 16,
//     width: "48%",
//     borderRadius: 8,
//     overflow: "hidden",
//   },
//   postImage: {
//     width: "100%",
//     height: 200,
//     resizeMode: "cover",
//     borderRadius: 8,
//   },
//   postFooter: {
//     flexDirection: "column",
//     alignItems: "flex-start",
//     padding: 8,
//     backgroundColor: "#f9f9f9",
//   },
//   iconContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 2,
//   },
//   icon: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginRight: 8,
//     backgroundColor: "rgba(255, 255, 255, 0.8)",
//     borderRadius: 20,
//     padding: 8,
//   },
//   iconText: {
//     marginLeft: 4,
//     color: "#333333",
//   },
//   textContainer: {
//     marginLeft: 8,
//   },
//   titleText: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#333333",
//   },
//   hashtagText: {
//     color: "#666666",
//   },
// });

// export default MyPostsScreen;
import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyPost } from "../../app/MyPost/action";
import { fetchLikePost } from "../../app/LikePost/action";
import EmptyResult from "../Search/EmptyResult";

const MyPostsScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const accountId = useSelector((state) => state.user.accountId);
  const dataMyPost = useSelector((state) => state.fetchMyPost?.posts);
  const [dataPost, setDataMyPost] = useState([]);
  useFocusEffect(
    useCallback(() => {
      dispatch(fetchMyPost(accountId || 0)).then((result) => {
        if (!result.error) {

        } else {
          console.log("Error received:", result.error);
        }
      });
    }, [dispatch, accountId])
  );
  const navigateToListLike = (postId) => {
    const post = dataMyPost.find((p) => p.postId === postId);
    if (post) {
      navigation.navigate("ListLike", {
        dataLike: post,
      });
    }
  };
  // const handleLikePress = async (postId) => {
  //   try {
  //     await dispatch(fetchLikePost({ postId }));
  //     await dispatch(fetchMyPost(accountId || 0));
  //   } catch (error) {
  //     console.error("Error dispatching likePost:", error.message);
  //   }
  // };
  const handleLikePress = async (postId) => {
    try {
      await dispatch(fetchLikePost({ postId }));
      await dispatch(fetchMyPost(accountId || 0));

      // Cập nhật lại dữ liệu bài viết trên giao diện
      setDataMyPost((prevData) => {
        return prevData.map((post) => {
          if (post.postId === postId) {
            return {
              ...post,
              likes: post.likes.map((like) => {
                if (like.likeBy === accountId) {
                  return {
                    ...like,
                    isLike: !like.isLike,
                  };
                }
                return like;
              }),
            };
          }
          return post;
        });
      });
    } catch (error) {
      console.error("Error dispatching likePost:", error.message);
    }
  };


  const navigateToCartDetail = (item) => {
    navigation.navigate("CartDetail", { item });
  };

  const renderItem = ({ item }) => {
    return (
      <View key={item.postId} style={styles.postContainer}>
        <TouchableOpacity onPress={() => navigateToCartDetail(item)}>
          <Image source={{ uri: item.image }} style={styles.postImage} />

          <View style={styles.postFooter}>
            <View style={styles.iconContainer}>
              <TouchableOpacity
                style={styles.icon}
                onPress={() => handleLikePress(item.postId)}
              >
                <Icon
                  name={
                    item.likes.some(
                      (like) => like.isLike === true && like.likeBy == accountId
                    )
                      ? "heart"
                      : "heart-outline"
                  }
                  size={24}
                  style={{
                    color: item.likes.some(
                      (like) => like.isLike === true && like.likeBy == accountId
                    )
                      ? "red"
                      : "black",
                  }}
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
                <Text style={styles.iconText}>{item.comments}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.textContainer}>
              <Text
                numberOfLines={2}
                ellipsizeMode="tail"
                style={styles.titleText}
              >
                {item.content}
              </Text>

              {item.hashPosts.map((hashPost, index) => (
                <Text key={index} style={styles.hashtagText}>
                  {hashPost?.hashtag?.name}
                </Text>
              ))}
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={dataMyPost}
        keyExtractor={(item) => item.postId.toString()}
        renderItem={renderItem}
        numColumns={2}
        ListEmptyComponent={EmptyResult}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 16,
  },
  postContainer: {
    marginBottom: 16,
    marginRight: 16,
    width: "48%",
    borderRadius: 8,
    overflow: "hidden",
  },
  postImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 8,
  },
  postFooter: {
    flexDirection: "column",
    alignItems: "flex-start",
    padding: 8,
    backgroundColor: "#f9f9f9",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },
  icon: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 8,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 20,
    padding: 8,
  },
  iconText: {
    marginLeft: 4,
    color: "#333333",
  },
  textContainer: {
    marginLeft: 8,
  },
  titleText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
  },
  hashtagText: {
    color: "#666666",
  },
});

export default MyPostsScreen;
