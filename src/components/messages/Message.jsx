import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Image,
  Modal,
  Pressable,
  useWindowDimensions,
} from "react-native";
import {
  FlingGestureHandler,
  Directions,
  State,
} from "react-native-gesture-handler";
import Animated, {
  withSpring,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  useSharedValue,
} from "react-native-reanimated";

import { theme } from "../../constants/theme";
import { parseMessageTime } from "../../utils";

const Message = ({ time, isLeft, message, onSwipe, name, image }) => {
  const screenSize = useWindowDimensions();
  const startingPosition = 0;
  const x = useSharedValue(startingPosition);
  const [modalVisible, setModalVisible] = useState(false);
  const isOnLeft = (type) => {
    if (isLeft && type === "messageContainer") {
      return {
        alignSelf: "flex-start",
        backgroundColor: "#f0f0f0",
        borderTopLeftRadius: 0,
      };
    } else if (isLeft && type === "imageContainer") {
      return {
        alignSelf: "flex-start",
        borderTopLeftRadius: 0,
      };
    } else if (isLeft && type === "message") {
      return {
        color: "#000",
      };
    } else if (isLeft && type === "time") {
      return {
        color: "darkgray",
      };
    } else if (isLeft && (type === "name" || type === "image")) {
      return {
        alignSelf: "flex-start",
      };
    } else {
      return {
        borderTopRightRadius: 0,
      };
    }
  };
  const eventHandler = useAnimatedGestureHandler({
    onStart: (event, ctx) => {},
    onActive: (event, ctx) => {
      x.value = isLeft ? 50 : -50;
    },
    onEnd: (event, ctx) => {
      x.value = withSpring(startingPosition);
    },
  });

  const uas = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: x.value }],
    };
  });

  return (
    <FlingGestureHandler
      direction={isLeft ? Directions.RIGHT : Directions.LEFT}
      onGestureEvent={eventHandler}
      onHandlerStateChange={({ nativeEvent }) => {
        if (nativeEvent.state === State.ACTIVE) {
          // onSwipe(message, isLeft);
        }
      }}
    >
      <Animated.View style={[styles.container, uas]}>
        <Text style={[styles.name, isOnLeft("name")]}>{name}</Text>
        {image ? (
          <Pressable onPress={() => setModalVisible(true)}>
            <View style={[styles.imageContainer, isOnLeft("imageContainer")]}>
              <Image src={image} style={[styles.image, isOnLeft("image")]} />
              <View style={styles.timeView}>
                <Text style={[styles.time, isOnLeft("time")]}>
                  {parseMessageTime(time)}
                </Text>
              </View>
            </View>
          </Pressable>
        ) : (
          <View style={[styles.messageContainer, isOnLeft("messageContainer")]}>
            <View style={styles.messageView}>
              <Text style={[styles.message, isOnLeft("message")]}>
                {message}
              </Text>
            </View>
            <View style={styles.timeView}>
              <Text style={[styles.time, isOnLeft("time")]}>
                {parseMessageTime(time)}
              </Text>
            </View>
          </View>
        )}
        <View>
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
                  src={image}
                  style={{
                    width: screenSize.width - 10,
                    height: screenSize.height / 2,
                  }}
                />
                <View style={styles.buttonContainer}>
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
        </View>
      </Animated.View>
    </FlingGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    marginVertical: 5,
  },
  messageContainer: {
    backgroundColor: theme.colors.messageBackground,
    maxWidth: "80%",
    alignSelf: "flex-end",
    flexDirection: "row",
    borderRadius: 15,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    paddingTop: 5,
    paddingBottom: 10,
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
  messageView: {
    backgroundColor: "transparent",
    maxWidth: "80%",
  },
  timeView: {
    backgroundColor: "transparent",
    justifyContent: "flex-end",
    paddingLeft: 10,
  },
  message: {
    color: "white",
    alignSelf: "flex-start",
    fontSize: 15,
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
  name: {
    maxWidth: "80%",
    alignSelf: "flex-end",
    flexDirection: "row",
    borderRadius: 15,
    marginHorizontal: 10,
    backgroundColor: "transparent",
  },
  backButton: {
    alignSelf: "center",
    paddingHorizontal: 10,
  },
  addButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
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
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 25,
  },
  errorText: {
    color: theme.colors.danger,
    textAlign: "center",
  },
});

export default Message;
