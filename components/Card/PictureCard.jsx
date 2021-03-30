import React from "react";
import { StyleSheet, View } from "react-native";
import { Image } from "react-native-elements";

const PictureCard = ({ image }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "data:image/jpeg;base64," + image }}
        style={{ width: 150, height: 150 }}
      />
    </View>
  );
};

export default PictureCard;

const styles = StyleSheet.create({ container: { margin: 5 } });
