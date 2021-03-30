import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";
import { SafeAreaView } from "react-native-safe-area-context";
const Preview = () => {
  const route = useRoute();
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
    });
  }, []);
  let image = [];
  for (let x of route.params.images) {
    image.push({ url: "data:image/jpeg;base64," + x });
  }

  return (
    <SafeAreaView style={{ flex: 1, marginTop: -5, backgroundColor: "#000" }}>
      <View style={styles.preview}>
        <ImageViewer
          imageUrls={image}
          index={route.params.index}
          renderIndicator={() => null}
          sty
        />
      </View>
    </SafeAreaView>
  );
};

export default Preview;

const styles = StyleSheet.create({
  preview: { backgroundColor: "#F5FCFF", flex: 1 },
});
