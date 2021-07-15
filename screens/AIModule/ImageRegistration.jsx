import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { Icon, Button, Overlay, Image } from "react-native-elements";
import { Title, useTheme } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import {
  GET__IMAGE_ENHANCEMENT,
  GET__IMAGE_REGISTRATION,
} from "../../redux/actions/AImoduleAction";
import SavingModel from "../../components/SavingModel";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { SUCCESS } from "../../redux/actions/MessageAction";
const ImageRegistration = () => {
  const paper = useTheme();
  const [visible, setVisible] = useState(false);
  const [pic, setPic] = useState(null);
  const [result, setResult] = useState(null);
  const [model, setModel] = useState(false);
  const User = useSelector((state) => state.User.TOKEN);
  const toggleOverlay = () => {
    setVisible(!visible);
  };
  const dispatch = useDispatch();
  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        quality: 1,
        base64: true,
      });
      if (!result.cancelled) {
        setPic(result.base64);
      }
    } catch (E) {
      alert(E);
    }
  };

  const pickCamera = async () => {
    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        quality: 1,
        base64: true,
      });
      if (!result.cancelled) {
        setPic(result.base64);
      }
    } catch (E) {
      alert(E);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <SavingModel visible={model} title="Enhancing" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {pic && (
          <Image
            source={{ uri: "data:image/png;base64," + pic }}
            style={{ height: 500, padding: 12 }}
          />
        )}
        <Button
          onPress={toggleOverlay}
          containerStyle={{ margin: 20 }}
          title="Select A Image"
        />
        {result && (
          <>
            <Image
              source={{ uri: result }}
              style={{ height: 500, padding: 12 }}
            />
            <Button
              onPress={async () => {
                let filePath = FileSystem.documentDirectory + "imageR.jpeg";
                console.log(filePath);
                await FileSystem.writeAsStringAsync(
                  filePath,
                  result.split(",")[1],
                  {
                    encoding: FileSystem.EncodingType.Base64,
                  }
                )
                  .then(async () => {
                    let { status } =
                      await MediaLibrary.requestPermissionsAsync();
                    console.log(status);
                    if (status === "granted") {
                      await MediaLibrary.saveToLibraryAsync(filePath);
                      dispatch(
                        SUCCESS({
                          content: "Image in save To Library",
                          type: "info",
                        })
                      );
                    }
                  })
                  .catch((err) => alert(err));
              }}
              buttonStyle={{ backgroundColor: paper.colors.error }}
              containerStyle={{ margin: 20 }}
              title="Save"
            />
          </>
        )}
        <Button
          onPress={() => {
            setModel(true);
            setResult(null);
            dispatch(
              GET__IMAGE_REGISTRATION(
                { pic_base64: pic },
                (v) => {
                  console.log(v.length);
                  setResult(v);
                  setModel(false);
                },
                () => {
                  setModel(false);
                }
              )
            );
          }}
          buttonStyle={{ backgroundColor: paper.colors.primary }}
          containerStyle={{ margin: 20 }}
          title="Apply Registration"
        />
      </ScrollView>
      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        overlayStyle={{
          borderRadius: 10,
          padding: 20,
          backgroundColor: paper.colors.surface,
        }}
      >
        <View
          style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Icon
            name="close"
            type="evilicon"
            color={paper.colors.onSurface}
            size={32}
            containerStyle={{ alignSelf: "flex-end" }}
            onPress={toggleOverlay}
          />
          <Title style={{ alignSelf: "center" }}>Select Image</Title>
          <Button
            icon={
              <Icon
                name="camera"
                size={20}
                color="#fff"
                style={{ margin: 7 }}
                type="font-awesome-5"
              />
            }
            onPress={pickCamera}
            buttonStyle={{ marginVertical: 10 }}
            title="Upload from Camera"
          />
          <Button
            icon={
              <Icon
                name="md-images"
                type="ionicon"
                size={24}
                color="#03a9f4"
                style={{ margin: 7 }}
              />
            }
            buttonStyle={{ marginVertical: 10 }}
            titleStyle={{ color: "#2196f3" }}
            type="clear"
            title="Open Gallery"
            onPress={pickImage}
          />
        </View>
      </Overlay>
    </View>
  );
};

export default ImageRegistration;
