import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Root } from "native-base";

import useCachedResources from "./hooks/useCachedResources";

import AuthNavigation from "./navigation/AuthNavigation";

import { Provider as ReduxProvider } from "react-redux";
import MianStore from "./redux/store/MianStore";

import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigation from "./navigation/DrawerNavigation";

import LinkingConfiguration from "./navigation/LinkingConfiguration";
import LanguageScreen from "./components/LanguageScreen";
import { StyleSheet } from "react-native";

import SplashScreen from "./components/SplashScreen";

import ConnectionError from "./components/ConnectionError";
import ConnectionSuccess from "./components/ConnectionSuccess";

export default () => {
  return (
    <ReduxProvider store={MianStore}>
      <App />
    </ReduxProvider>
  );
};

function App() {
  const [
    isLoadingComplete,
    ISLOGGED,
    LANGUAGE_STATUS,
    connection,
  ] = useCachedResources();

  if (isLoadingComplete) {
    return (
      <PaperProvider>
        <SplashScreen />
      </PaperProvider>
    );
  } else {
    return (
      <SafeAreaProvider>
        <PaperProvider>
          <Root>
            {!LANGUAGE_STATUS ? (
              <LanguageScreen />
            ) : (
              <NavigationContainer linking={LinkingConfiguration}>
                {ISLOGGED ? <DrawerNavigation /> : <AuthNavigation />}
                {!connection.isConnected ? (
                  <ConnectionError />
                ) : (
                  <ConnectionSuccess />
                )}
              </NavigationContainer>
            )}
          </Root>
        </PaperProvider>
      </SafeAreaProvider>
    );
  }
}
const styles = StyleSheet.create({
  connected: {
    backgroundColor: "green",
    padding: 12,
  },
  error: {
    backgroundColor: "red",
    padding: 12,
  },
  text: {
    color: "white",
    textAlign: "center",
  },
});
