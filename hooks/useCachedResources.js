import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as React from "react";
import { AppState } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { GET_FAVORITE, USER_STATUS_IN } from "../redux/actions/UserActions";
import { ALL_DOC_SOCKET_UPDATE } from "../redux/actions/DoctorAction";
import { GET_LANGUAGE } from "../redux/actions/LanguageAction";
import io from "socket.io-client";
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SocketUrl } from "../config/Config";

const status = io(SocketUrl + "/status");

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(true);
  const [connection, setConnection] = React.useState(true);
  const dispatch = useDispatch();
  const IS_LOGGED = useSelector((state) => state.User.IS_LOGGED);
  const LANGUAGE_STATUS = useSelector((state) => state.Language.status);

  const User = async () => {
    let token = await AsyncStorage.getItem("Token");
    if (token !== null) {
      token = JSON.parse(token);
      return token;
    }
    return false;
  };
  const _handleAppStateChange = async (nextAppState) => {
    let data = await User();
    if (data) {
      if (nextAppState === "active" && data.role.includes("doctor")) {
        status.emit("online", {
          id: data._id,
          role: data.role,
          name: data.fname,
        });
      }
      if (nextAppState === "background" && data.role.includes("doctor")) {
        status.emit("offline", {
          id: data._id,
          role: data.role,
          name: data.fname,
        });
      }
    }
  };

  const _handleInternetChange = async (state) => {
    setConnection(state);
    let data = await User();
    if (data) {
      if (state.isConnected && data.role.includes("doctor")) {
        status.emit("online", {
          id: data._id,
          role: data.role,
          name: data.fname,
        });
      }
      if (!state.isConnected && data.role.includes("doctor")) {
        status.emit("offline", {
          id: data._id,
          role: data.role,
          name: data.fname,
        });
      }
    }
  };

  const _handleStatusChange = (msg) => {
    dispatch(ALL_DOC_SOCKET_UPDATE(msg));
  };
  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        dispatch(USER_STATUS_IN());
        // dispatch(USER_STATUS_OUT());
        // dispatch(DEL_LANGUAGE());
        dispatch(GET_LANGUAGE());
        dispatch(GET_FAVORITE());

        status.on("status-update", _handleStatusChange);

        const unsubscribe = NetInfo.addEventListener(_handleInternetChange);

        AppState.addEventListener("change", _handleAppStateChange);
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          "space-mono": require("../assets/fonts/SpaceMono-Regular.ttf"),
        });
        await Font.loadAsync({
          ...Ionicons.font,
          Helvetica: require("../assets/fonts/Helvetica.ttf"),
        });
        await Font.loadAsync({
          ...Ionicons.font,
          "Tuesday-Night": require("../assets/fonts/TuesdayNight-Regular.otf"),
        });
        await Font.loadAsync({
          ...Ionicons.font,
          "Bickham-Script": require("../assets/fonts/BickhamScriptPro-Regular.otf"),
        });
        return () => {
          AppState.removeEventListener("change", _handleAppStateChange);
          // Unsubscribe
          unsubscribe();
        };
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        alert("Error loading" + e.message);
      } finally {
        SplashScreen.hideAsync();
        setTimeout(() => {
          setLoadingComplete(false);
        }, 5000);
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return [isLoadingComplete, IS_LOGGED, LANGUAGE_STATUS, connection];
}
