import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Skeleton = () => {
  return (
    <View style={{ marginTop: 10, marginHorizontal: 15 }}>
      <View
        style={{
          height: 50,
          backgroundColor: "rgba(0, 0, 0, 0.06)",
          borderRadius: 10,
        }}
      ></View>
      <View
        style={{
          height: 50,
          backgroundColor: "rgba(0, 0, 0, 0.06)",
          borderRadius: 10,
          marginTop: 10,
        }}
      ></View>
    </View>
  );
};

export default Skeleton;

const styles = StyleSheet.create({});
