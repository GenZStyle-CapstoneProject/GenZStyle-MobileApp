import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Linking,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import products from "../data/Products";
import Cart from "../components/Home/Cart";
import { fecthActivePost } from "../app/ActivePost/action";
import { fetchCommentPost } from "../app/CommentPost/action";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddCommentPost } from "../app/AddComment/action";
const CartDetail = ({ route }) => {
  const navigation = useNavigation();
  const { item } = route.params;
  const [reportModalVisible, setReportModalVisible] = useState(false);

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState();

  const [isLiked, setIsLiked] = useState(false);
  const handleLikePress = () => {
    setIsLiked(!isLiked);
  };
  const navigateToListLike = () => {
    // Navigate to ListLikeScreen when the heart icon or the number is clicked
    navigation.navigate("ListLike");
  };
  // const handleAddComment = () => {
  //   if (comment.trim() !== "") {
  //     setComments([...comments, comment]);
  //     console.log("Added comment", comment);
  //     setComment("");
  //   }
  // };

  const handleAddComment = async () => {
    if (comment.trim() !== "") {
      try {
        await dispatch(
          fetchAddCommentPost({
            postId: item.postId,
            createAt: new Date().toISOString(),
            content: comment,
          })
        );

        console.log("Added comment", comment);
        setComment("");
      } catch (error) {
        // Handle any errors if the Redux thunk fails
        console.error("Error dispatching fetchAddCommentPost:", error.message);
      }
    }
  };
  const openReportModal = () => {
    setReportModalVisible(true);
  };

  const closeReportModal = () => {
    setReportModalVisible(false);
  };

  const handleReportOptionPress = () => {
    console.log("Reported");
    closeReportModal();
  };
  const handleReporPost = () => {
    closeReportModal();
    navigation.navigate("ReportPost");
  };
  const dispatch = useDispatch();
  console.log("Item id", item.postId);
  useEffect(() => {
    dispatch(fetchCommentPost(item.postId)).then((result) => {
      if (result.payload) {
        console.log("Data Comment:", result.payload);
        const data = result.payload.map((item) => item.content);
        console.log("Data Comment 2:", data);
        setComments(data);
      } else {
        console.log("Error received");
      }
    });
  }, [comment]);

  return (
    <ScrollView style={styles.container}>
      {/* Back button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="close" size={40} color="white" />
      </TouchableOpacity>
      {/* Hình ảnh sản phẩm */}
      <Image source={{ uri: item.image }} style={styles.image} />

      {/* Icon trái tim và bình luận */}
      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.icon} onPress={handleLikePress}>
          <Icon
            name={isLiked ? "heart" : "heart-outline"}
            size={24}
            color={isLiked ? "red" : "black"}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon} onPress={navigateToListLike}>
          <Text style={styles.iconText}>({item.likes.length})</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <Icon name="chat-outline" size={24} color="black" />
          <Text style={styles.iconText}></Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.moreOptionsIcon}
          onPress={openReportModal}
        >
          <Icon name="dots-horizontal" size={24} color="black" />
        </TouchableOpacity>
      </View>
      {/* Report Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={reportModalVisible}
        onRequestClose={closeReportModal}
      >
        <TouchableWithoutFeedback onPress={closeReportModal}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.reportModal}>
          <Text style={styles.reportOption} onPress={handleReporPost}>
            Báo Cáo
          </Text>
          <Text style={styles.closeReportModal} onPress={closeReportModal}>
            Cancel
          </Text>
        </View>
      </Modal>
      <View style={styles.textRow}>
        <Text style={styles.titleText}>{item.content}</Text>
      </View>
      <View style={styles.textRow}>
        {item?.hashPosts?.map((itemDetail) => (
          <Text key={itemDetail.hashtag.id} style={styles.hashtagText}>
            {itemDetail?.hashtag.name}
          </Text>
        ))}
      </View>
      {/* Danh sách bình luận */}
      <FlatList
        data={comments}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.commentContainer}>
            <Text>{item}</Text>
          </View>
        )}
      />

      {/* Phần nhập bình luận */}
      <View style={styles.commentInputContainer}>
        <TextInput
          style={styles.commentInput}
          placeholder="Thêm bình luận ..."
          value={comment}
          onChangeText={(text) => setComment(text)}
        />
        <TouchableOpacity onPress={handleAddComment}>
          <Text style={styles.addCommentButton}>Thêm</Text>
        </TouchableOpacity>
      </View>

      {/* Link sản phẩm */}
      <Text style={styles.linkSPText}>Link sản phẩm:</Text>
      <Text
        style={styles.linkText}
        onPress={() => Linking.openURL("https://www.fptshop.com")}
      >
        www.fptshop.com
      </Text>

      {/* Các sản phẩm liên quan 
      <View style={styles.relatedProductsContainer}>
        <Text style={styles.relatedProductsTitle}>Các sản phẩm liên quan:</Text>

        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigateToCartDetail(item)}>
              <Cart item={item} />
            </TouchableOpacity>
          )}
          numColumns={2}
        />
      </View>*/}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  backButton: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 1,
  },
  image: {
    width: "100%",
    height: 600,
    resizeMode: "cover",
    marginBottom: 16,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "start",
    marginBottom: 5,
  },
  commentContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    // backgroundColor: '#E3E5F8',
    backgroundColor: "gray",
    borderRadius: 20,
    padding: 8,
  },
  commentIcon: {
    marginRight: 8,
  },
  commentTextPlaceholder: {
    color: "#333",
    fontStyle: "italic",
    marginRight: 8,
  },
  commentText: {
    flex: 1,
  },
  commentInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    padding: 8,
    marginRight: 8,
  },
  addCommentButton: {
    color: "blue",
    fontWeight: "bold",
  },
  textRow: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 5,
  },
  icon: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  iconText: {
    marginLeft: 5,
  },
  linkText: {
    color: "blue",
    marginTop: 10,
    marginBottom: 10,
    fontSize: 16,
    textDecorationLine: "underline",
  },
  linkSPText: {
    color: "black",
    marginTop: 20,
    marginBottom: 10,
    fontSize: 16,
    // textDecorationLine: 'underline',
  },

  relatedProductsContainer: {
    marginTop: 20,
  },

  relatedProductsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  moreOptionsIcon: {
    position: "absolute",

    right: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  reportModal: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: "center",
  },
  reportOption: {
    fontSize: 18,
    marginBottom: 10,
    color: "black",
  },
  closeReportModal: {
    fontSize: 18,
    color: "red",
    marginTop: 10,
  },
});

export default CartDetail;
