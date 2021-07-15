import React from "react";
import { ImageBackground } from "react-native";
import { ActivityIndicator } from "react-native-paper";

const SplashScreen = () => {
  return (
    <>
      <ImageBackground
        source={require("../assets/images/New/splash.png")}
        style={{
          flex: 1,
          position: "relative",
          resizeMode: "contain",
        }}
        resizeMode="cover"
      >
        <ActivityIndicator
          animating={true}
          color="#1de9b6"
          size="large"
          style={{ position: "absolute", bottom: "28%", left: "45%" }}
        />
      </ImageBackground>
    </>
  );
};

export default SplashScreen;
