import React from "react";
import { ImageBackground } from "react-native";
import { ActivityIndicator } from "react-native-paper";

const SplashScreen = () => {
  return (
    <>
      <ImageBackground
        source={require("../assets/images/New/splash.png")}
        style={{ flex: 1, display: "flex", justifyContent: "center" }}
        resizeMode="cover"
      >
        <ActivityIndicator
          animating={true}
          color="#1de9b6"
          size="large"
          style={{}}
        />
      </ImageBackground>
    </>
  );
};

export default SplashScreen;
