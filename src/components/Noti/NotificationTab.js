import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

const NotificationTab = () => {
  const [notifications, setNotifications] = useState([]);

  const fetchData = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("ACCESS_TOKEN");
      const response = await axios.get(
        "https://genzstyleapp.azurewebsites.net/odata/Notification",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setNotifications(response.data.value);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  return (
    <ScrollView>
      <View style={styles.container}>
        {notifications.map((notification) => (
          <View key={notification.NotificationId}>
            <Text style={styles.activityText}>
              <Text style={styles.boldText}>{notification.Message} </Text>
            </Text>
            <View style={styles.hr} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
    backgroundColor: "white",
  },
  activityText: {
    fontSize: 16,
  },
  boldText: {
    fontWeight: "bold",
  },
  hr: {
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
    marginVertical: 5,
  },
});

export default NotificationTab;