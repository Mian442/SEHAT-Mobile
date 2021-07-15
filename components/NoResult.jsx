import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Title } from "react-native-paper";

const NoResult = ({ title = "No Result" }) => {
  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        flex: 1,
      }}
    >
      <Title style={{ textAlign: "center", margin: 10 }}>{title}</Title>
    </View>
  );
};

export default NoResult;

const styles = StyleSheet.create({});
