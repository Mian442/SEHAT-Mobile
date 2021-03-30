import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";

const SettingScreen = () => {
  const paper = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: paper.colors.surface }}>
      <Text>setting</Text>
    </View>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({});
