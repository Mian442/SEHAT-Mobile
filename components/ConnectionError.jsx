import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ConnectionStatus = () => {
  return (
    <View style={styles.error}>
      <Text style={styles.text}>No Network is connected!</Text>
    </View>
  );
};

export default ConnectionStatus;

const styles = StyleSheet.create({
  error: {
    backgroundColor: "#ff5252",
    padding: 12,
  },
  text: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "800",
  },
});
