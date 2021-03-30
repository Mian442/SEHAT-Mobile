import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const ConnectionStatus = () => {
  const [flag, setFlag] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setFlag(false);
    }, 3000);
  }, []);
  return (
    <View>
      {flag ? (
        <View style={styles.connected}>
          <Text style={styles.text}>Network is connected!</Text>
        </View>
      ) : (
        <View style={{ display: "none" }}></View>
      )}
    </View>
  );
};

export default ConnectionStatus;

const styles = StyleSheet.create({
  connected: {
    backgroundColor: "#00e676",
    padding: 12,
  },
  text: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "800",
  },
});
