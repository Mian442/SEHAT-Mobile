import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { useTheme } from "react-native-paper";
import PictureCard from "../components/Card/PictureCard";
import NoResult from "../components/NoResult";

const PictureScreen = () => {
  const navigation = useNavigation();
  const paper = useTheme();
  const { params } = useRoute();
  return (
    <View style={{ flex: 1, backgroundColor: paper.colors.surface }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {params.pic.length > 0 ? (
            params.pic?.map((image, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => {
                  navigation.navigate("Preview", {
                    images: params.pic,
                    index: i,
                  });
                }}
              >
                <PictureCard image={image} />
              </TouchableOpacity>
            ))
          ) : (
            <NoResult />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default PictureScreen;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    margin: 25,
    justifyContent: "center",
  },
});
