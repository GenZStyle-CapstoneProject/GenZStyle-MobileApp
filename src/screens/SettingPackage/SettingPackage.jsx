import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import * as Payments from "react-native-payments";
import { useDispatch } from "react-redux";
import { fetchPurchasePackage } from "../../app/PackageRegister/action";
const SettingPackage = () => {
  const navigation = useNavigation();

  const [selectedSubscription, setSelectedSubscription] = useState(null);
  const [lastSelectedButton, setLastSelectedButton] = useState(null);

  const subscriptionDescriptions = {
    VIP: "This is the VIP subscription description:\n- Save time + storage space.\n- Premium manual + automatic edit tools in the GenZ mobile app.\n- Unlimited cloud storage of your GenZ footage at original post (unlimited)",
    Premium:
      "This is the Premium subscription description:\n- Save time + storage space.\n- Premium manual + automatic edit tools in the GenZ mobile app.\n- Unlimited cloud storage of your GenZ footage at original post (10post/1day)",
  };
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const closeModal = () => {
    setSelectedSubscription(null);
  };

  const subscriptionPrices = {
    VIP: 39.0,
    Premium: 99.0,
  };

  const dispatch = useDispatch();
  const handleSubscriptionPress = (subscription) => {
    setSelectedSubscription(subscription);
  };
  const handleRegister = (type) => {
    const fetchData = async (type) => {
      try {
        if (type === "VIP") {
          await dispatch(fetchPurchasePackage(1));
        } else {
          await dispatch(fetchPurchasePackage(2));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData(type);
  };
  const handlePayment = async () => {
    // Ensure a subscription is selected
    if (!selectedSubscription) {
      Alert.alert("Please select a subscription first.");
      return;
    }

    try {
      const paymentResult = await MomoPayment.requestPayment({
        partnerCode: "MOMO_PARTNER_A",
        orderId: "0123456789",
        requestId: "1234567891",
        amount: 0,
        responseTime: 1645170502966,
        message: "Successful.",
        resultCode: 0,
        payUrl:
          "https://test-payment.momo.vn/v2/gateway/pay?t=TU9NT0lPTEQyMDE5MDEyOXwwMTIzNDU2Nzg5MDEyMzQ1MTY0NTE3MDUwMzA3OQ==",
        deeplink:
          "momo://?action=subscription&isScanQR=false&sid=TU9NT0lPTEQyMDE5MDEyOXwwMTIzNDU2Nzg5MDEyMzQ1MTY0NTE3MDUwMzA3OQ==&v=2.1",
        qrCodeUrl:
          "https://test-payment.momo.vn/v2/gateway/app?isScanQr=true&t=TU9NT0lPTEQyMDE5MDEyOXwwMTIzNDU2Nzg5MDEyMzQ1MTY0NTE3MDUwMzA3OQ==",
        partnerClientId: "user123456",
      });

      // Process the payment result
      if (paymentResult && paymentResult.status === "success") {
        Alert.alert("Payment successful!");
      } else {
        Alert.alert("Payment failed!");
      }
    } catch (error) {
      console.error("Payment error:", error);
      Alert.alert("Payment failed!");
    }

    setSelectedSubscription(null);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        {/* Header */}
        <View style={{ flex: 1, justifyContent: "flex-start", marginTop: 40 }}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <MaterialIcons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1575202332411-b01fe9ace7a8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            }}
            style={{
              width: windowWidth,
              height: windowHeight,
              resizeMode: "cover",
            }}
          />
        </View>
        <View style={styles.footerContainer}>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[
                styles.button,
                selectedSubscription === "VIP" && styles.selectedButton,
                lastSelectedButton === "VIP" &&
                  !selectedSubscription &&
                  styles.lastSelectedButton,
              ]}
              onPress={() => handleSubscriptionPress("VIP")}
            >
              <Text style={styles.buttonText}>VIP</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                selectedSubscription === "Premium" && styles.selectedButton,
                lastSelectedButton === "Premium" &&
                  !selectedSubscription &&
                  styles.lastSelectedButton,
              ]}
              onPress={() => handleSubscriptionPress("Premium")}
            >
              <Text style={styles.buttonText}>Premium</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.subscribeButton}
            onPress={handlePayment}
          >
            <Text style={styles.buttonText}>Subscribe to StyleGenZ</Text>
          </TouchableOpacity>

          {/* Hiển thị Modal khi nút được chọn */}
          <Modal visible={selectedSubscription !== null} animationType="slide">
            <View style={styles.modalContainer}>
              <ScrollView contentContainerStyle={styles.modalContent}>
                <Text style={styles.descriptionText}>
                  {subscriptionDescriptions[selectedSubscription]}
                </Text>
                <TouchableOpacity
                  style={styles.registerButton}
                  onPress={() => handleRegister(selectedSubscription)}
                >
                  <Text style={styles.closeButtonText}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={closeModal}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </Modal>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    borderWidth: 3,
    borderColor: "black",
    padding: 10,
    borderRadius: 30,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  button: {
    flex: 1,
    backgroundColor: "lightgray",
    padding: 10,
    marginHorizontal: 5,
    alignItems: "center",
    borderRadius: 20,
  },
  selectedButton: {
    backgroundColor: "lightblue",
  },
  lastSelectedButton: {
    backgroundColor: "lightblue",
    borderColor: "black",
    borderWidth: 1,
  },
  subscribeButton: {
    backgroundColor: "#99A1E8",
    padding: 10,
    alignItems: "center",
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    borderWidth: 2,
    borderColor: "black",
    padding: 20,
    borderRadius: 10,
    backgroundColor: "white",
  },
  descriptionText: {
    fontSize: 14,
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: "#99A1E8",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  registerButton: {
    backgroundColor: "#99A1E8",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 16,
    color: "white",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  imageContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SettingPackage;
