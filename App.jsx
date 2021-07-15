import React, { useEffect, useRef } from "react";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";

import AuthNavigation from "./navigation/AuthNavigation";

import {
  Provider as ReduxProvider,
  useDispatch,
  useSelector,
} from "react-redux";
import MianStore from "./redux/store/MianStore";

import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigation from "./navigation/DrawerNavigation";

import LinkingConfiguration from "./navigation/LinkingConfiguration";
import LanguageScreen from "./components/LanguageScreen";
import { StyleSheet } from "react-native";

import SplashScreen from "./components/SplashScreen";

import ConnectionError from "./components/ConnectionError";
import ConnectionSuccess from "./components/ConnectionSuccess";

import { NativeBaseProvider, useToast } from "native-base";
import { NO_MESSAGE } from "./redux/actions/MessageAction";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
//Notification registration
async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}
const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
  },
};
export default () => {
  return (
    <ReduxProvider store={MianStore}>
      <PaperProvider theme={theme}>
        <NativeBaseProvider>
          <App />
        </NativeBaseProvider>
      </PaperProvider>
    </ReduxProvider>
  );
};

function App() {
  let Toast = useToast();
  const msg = useSelector((state) => state.Msg.msg);
  const notificationListener = useRef();
  const responseListener = useRef();
  const dispatch = useDispatch();
  const [isLoadingComplete, IS_LOGGED, LANGUAGE_STATUS, connection] =
    useCachedResources();
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      console.log(token);
    });

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);
  useEffect(() => {
    if (msg) {
      Toast.show({
        title: msg.content,
        status: msg.type,
      });
      setTimeout(() => {
        dispatch(NO_MESSAGE());
      }, 3000);
    }
  }, [msg]);

  if (isLoadingComplete) {
    return <SplashScreen />;
  } else {
    return (
      <SafeAreaProvider>
        {!LANGUAGE_STATUS ? (
          <LanguageScreen />
        ) : (
          <NavigationContainer linking={LinkingConfiguration}>
            {IS_LOGGED ? <DrawerNavigation /> : <AuthNavigation />}
            {!connection.isConnected ? (
              <ConnectionError />
            ) : (
              <ConnectionSuccess />
            )}
          </NavigationContainer>
        )}
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
