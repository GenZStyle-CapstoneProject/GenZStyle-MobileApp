import React, { useState, useEffect, useRef, memo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
  useWindowDimensions,
} from "react-native";

import Animated, {
  useSharedValue,
  withSpring,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { theme } from "../../constants/theme";
import { socket } from "../../services/chatService";
import { launchImageLibraryAsync } from "expo-image-picker";
import axios from "axios";
import { CHAT_BASE_URL } from "../../../env";

const ChatInput = ({
  reply,
  closeReply,
  isLeft,
  roomName,
  isFollower,
  isFollowing,
  numberOfMessages,
  type,
}) => {
  const screenSize = useWindowDimensions();
  const [message, setMessage] = useState("");
  const [photo, setPhoto] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadedPhoto, setUploadedPhoto] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const height = useSharedValue(70);

  useEffect(() => {
    if (showEmojiPicker) {
      height.value = withTiming(400);
    } else {
      height.value = reply ? withSpring(130) : withSpring(70);
    }
  }, [showEmojiPicker]);

  useEffect(() => {
    if (reply) {
      height.value = showEmojiPicker ? withTiming(450) : withTiming(130);
    } else {
      height.value = showEmojiPicker ? withSpring(400) : withSpring(70);
    }
  }, [reply]);

  const sendMessage = async (type, imageUrl) => {
    if (type && type === "image") {
      await socket.emit("group_message", {
        image: imageUrl,
      });
    } else {
      if (message !== "") {
        await socket.emit("group_message", {
          message: message,
        });
        setMessage("");
      }
    }
  };
  const heightAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: height.value,
    };
  });

  const handleUploadPhoto = async () => {
    try {
      if (uploadedPhoto) {
        setLoading(true);
        let baseUrl = "";
        let base64 = uploadedPhoto?.assets[0]?.base64;

        if (__DEV__) {
          baseUrl = CHAT_BASE_URL;
          // Platform.OS === "android"
          //   ? "http://192.168.2.7:4000"
          //   : "http://localhost:4000";
        } else {
          baseUrl = CHAT_BASE_URL;
        }

        const requestUrl = baseUrl + "/api/v1/upload-image";
        const res = await axios.post(
          requestUrl,
          {
            data: base64,
            contentType: uploadedPhoto?.assets[0]?.mimeType,
            fileName: uploadedPhoto?.assets[0]?.fileName,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        await sendMessage("image", res.data.url);
        setModalVisible(false);
      }
    } catch (err) {
      console.log("upload photo error", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChoosePhoto = async () => {
    var options = {
      title: "Chọn ảnh",
      noData: true,
      mediaType: "photo",
      base64: true,
    };
    const uploadedPhoto = await launchImageLibraryAsync(options);
    setPhoto(uploadedPhoto?.assets[0]?.uri);
    setUploadedPhoto(uploadedPhoto);
    setModalVisible(true);
  };

  return (
    <Animated.View style={[styles.container, heightAnimatedStyle]}>
      {reply ? (
        <View style={styles.replyContainer}>
          <TouchableOpacity onPress={closeReply} style={styles.closeReply}>
            <Icon name="close" color="#000" size={20} />
          </TouchableOpacity>
          <Text style={styles.title}>
            Response to {isLeft ? roomName : "Me"}
          </Text>
          <Text style={styles.reply}>{reply}</Text>
        </View>
      ) : null}
      {!isFollower && type === "personal" && numberOfMessages < 3 && (
        <Text style={{ textAlign: "center" }}>
          {
            "Người này chưa theo dõi bạn, bạn sẽ chỉ được gửi tối đa 3 tin nhắn!"
          }
        </Text>
      )}
      {!isFollower && type === "personal" && numberOfMessages >= 3 && (
        <Text style={{ textAlign: "center" }}>
          {`Đã hết số lần nhắn tin, hãy chờ ${roomName} phản hồi nhé!`}
        </Text>
      )}
      {!isFollowing && type === "personal" && (
        <Text style={{ textAlign: "center" }}>
          {"Người này bạn chưa theo dõi, hãy theo dõi để chat nhé!"}
        </Text>
      )}
      {photo?.uri && (
        <Image
          source={{ uri: photo.uri }}
          style={{ width: 300, height: 300 }}
        />
      )}

      {(type === "personal" && isFollowing && numberOfMessages < 3) ||
      (isFollower && isFollowing) ? (
        <View style={styles.innerContainer}>
          <View style={styles.inputAndMicrophone}>
            {/* <TouchableOpacity
            style={styles.emoticonButton}
            onPress={() => setShowEmojiPicker((value) => !value)}
          >
            <Icon
              name={showEmojiPicker ? "close" : "emoticon-outline"}
              size={23}
              color={theme.colors.description}
            />
          </TouchableOpacity> */}

            <TextInput
              multiline
              placeholder={"Nhập một thứ gì đó..."}
              style={styles.input}
              value={message}
              onChangeText={(text) => setMessage(text)}
            />
            {/* <TouchableOpacity style={styles.rightIconButtonStyle}>
            <Icon name="paperclip" size={23} color={theme.colors.description} />
          </TouchableOpacity> */}
            <TouchableOpacity
              style={styles.rightIconButtonStyle}
              onPress={handleChoosePhoto}
            >
              <Icon
                name="view-gallery"
                size={23}
                color={theme.colors.description}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[
              styles.sendButton,
              {
                backgroundColor:
                  (!isFollower && numberOfMessages >= 3) || message === ""
                    ? "#c2c2c2"
                    : theme.colors.primary,
              },
            ]}
            onPress={() => sendMessage()}
            disabled={
              (!isFollower && numberOfMessages >= 3) || message === ""
                ? true
                : false
            }
          >
            <Icon
              // name={message ? "send" : "microphone"}
              name={"send"}
              size={23}
              color={theme.colors.white}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <></>
      )}
      {type === "group" ? (
        <View style={styles.innerContainer}>
          <View style={styles.inputAndMicrophone}>
            {/* <TouchableOpacity
            style={styles.emoticonButton}
            onPress={() => setShowEmojiPicker((value) => !value)}
          >
            <Icon
              name={showEmojiPicker ? "close" : "emoticon-outline"}
              size={23}
              color={theme.colors.description}
            />
          </TouchableOpacity> */}

            <TextInput
              multiline
              placeholder={"Nhập một thứ gì đó..."}
              style={styles.input}
              value={message}
              onChangeText={(text) => setMessage(text)}
            />
            {/* <TouchableOpacity style={styles.rightIconButtonStyle}>
            <Icon name="paperclip" size={23} color={theme.colors.description} />
          </TouchableOpacity> */}
            <TouchableOpacity
              style={styles.rightIconButtonStyle}
              onPress={handleChoosePhoto}
            >
              <Icon
                name="view-gallery"
                size={23}
                color={theme.colors.description}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[
              styles.sendButton,
              {
                backgroundColor: theme.colors.primary,
              },
            ]}
            onPress={() => sendMessage()}
          >
            <Icon
              // name={message ? "send" : "microphone"}
              name={"send"}
              size={23}
              color={theme.colors.white}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <></>
      )}
      {photo !== "" && (
        <Modal animationType="fade" transparent={true} visible={modalVisible}>
          <View style={styles.centeredView}>
            <View
              style={[
                styles.modalView,
                {
                  width: screenSize.width,
                  height: screenSize.height,
                  paddingTop: screenSize.height * 0.2,
                },
              ]}
            >
              <Image
                src={photo}
                style={{
                  width: screenSize.width - 10,
                  height: screenSize.height / 2,
                }}
              />
              <View style={styles.buttonContainer}>
                <Pressable
                  style={
                    loading
                      ? [styles.button, styles.disabledButton]
                      : [styles.button, styles.buttonCreate]
                  }
                  onPress={() => handleUploadPhoto()}
                  disabled={loading}
                >
                  <Text style={styles.textUpload}>
                    {loading ? "Đang tải ảnh lên..." : "Gửi"}
                  </Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonCancel]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Đóng</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      )}
      {/* <EmojiPicker /> */}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    backgroundColor: theme.colors.white,
  },
  replyContainer: {
    paddingHorizontal: 10,
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  title: {
    marginTop: 5,
    fontWeight: "bold",
  },
  closeReply: {
    position: "absolute",
    right: 10,
    top: 5,
  },
  reply: {
    marginTop: 5,
  },
  innerContainer: {
    paddingHorizontal: 10,
    marginHorizontal: 10,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 10,
  },
  inputAndMicrophone: {
    flexDirection: "row",
    backgroundColor: theme.colors.inputBackground,
    flex: 3,
    marginRight: 10,
    paddingVertical: Platform.OS === "ios" ? 10 : 0,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    backgroundColor: "transparent",
    paddingLeft: 20,
    color: theme.colors.inputText,
    flex: 3,
    fontSize: 15,
    height: 50,
    alignSelf: "center",
  },
  rightIconButtonStyle: {
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 15,
    paddingLeft: 10,
    borderLeftWidth: 1,
    borderLeftColor: "#fff",
  },
  swipeToCancelView: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 30,
  },
  swipeText: {
    color: theme.colors.description,
    fontSize: 15,
  },
  emoticonButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 10,
  },
  recordingActive: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 10,
  },
  recordingTime: {
    color: theme.colors.description,
    fontSize: 20,
    marginLeft: 5,
  },
  microphoneAndLock: {
    alignItems: "center",
    justifyContent: "flex-end",
  },
  lockView: {
    backgroundColor: "#eee",
    width: 60,
    alignItems: "center",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: 130,
    paddingTop: 20,
  },
  sendButton: {
    borderRadius: 50,
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    maxWidth: "100%",
    alignSelf: "flex-end",
    flexDirection: "column",
    borderRadius: 15,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    paddingTop: 5,
    paddingBottom: 10,
  },

  time: {
    color: "lightgray",
    alignSelf: "flex-end",
    fontSize: 10,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 12,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flex: 1,
    marginTop: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
  modalView: {
    justifyContent: "center",
    backgroundColor: "#44444493",
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#44444493",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    width: 200,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonCreate: {
    backgroundColor: theme.colors.primary,
  },
  buttonCancel: {
    backgroundColor: "white",
  },
  disabledButton: {
    backgroundColor: "#c2c2c2",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 25,
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
  textUpload: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
});

export default ChatInput;
