import React, { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
  Platform,
  TouchableOpacity,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import {
  ActivityIndicator,
  RadioButton,
  useTheme,
  Text,
  HelperText,
} from "react-native-paper";
import { Image } from "react-native-elements";
import { Icon, Button, Input } from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { USER_STATUS_REGISTER } from "../../redux/actions/UserActions";
import { ERROR } from "../../redux/actions/MessageAction";
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

const SignUp = () => {
  const notificationListener = useRef();
  const responseListener = useRef();
  const [name, setName] = useState("");
  const [dob, setDOB] = useState("");
  const [ph, setPh] = useState("");
  const [email, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [token, setToken] = useState("");
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("date");
  const [loading, setLoading] = useState(false);
  const [gender, setGender] = React.useState("");
  const navigation = useNavigation();
  const route = useRoute();
  const paper = useTheme();
  const dispatch = useDispatch();
  const Lang = useSelector((state) => state.Language.Lang);
  const NametextInput = React.createRef();
  const PhnametextInput = React.createRef();
  const passnametextInput = React.createRef();
  const confrimpassnametextInput = React.createRef();
  const emailtextInput = React.createRef();
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      console.log(token);
      setToken(token);
    });

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log(notification);
        setToken(notification);
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
  let schema = yup.object().shape({
    name: yup.string().required(),
    ph: yup.string().required().min(10),
    dob: yup.date().required(),
    gender: yup.string().required(),
    token: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).max(32).required(),
  });

  function goToLogin() {
    return navigation.navigate("Login");
  }

  async function handleOnSignup() {
    if (password === cpassword) {
      setLoading(true);
      let data = {
        name,
        ph,
        dob,
        gender,
        email: email.trim().toLowerCase(),
        password,
        token,
      };
      schema
        .validate(data, { abortEarly: false })
        .then((valid) => {
          console.log("focus");
          dispatch(
            USER_STATUS_REGISTER(
              {
                ...valid,
                pic: null,
              },
              () => {
                setLoading(false);
              }
            )
          );
        })
        .catch((err) => {
          dispatch(ERROR({ content: err.errors[0], type: "error" }));
          setLoading(false);
        });
    } else {
      dispatch(ERROR({ content: "Password not Matched!", type: "error" }));
    }
  }

  const showDatepicker = () => {
    showMode("date");
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || dob;
    setShow(Platform.OS === "ios");
    setDOB(currentDate);
  };

  return (
    <View style={styles.Signup}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ marginTop: "8%" }}>
          <TouchableOpacity
            style={{ margin: 5 }}
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <Icon
              name="md-arrow-back"
              type="ionicon"
              size={28}
              style={{ margin: 8, alignSelf: "flex-start" }}
              color="#fff"
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginTop: 20,
          }}
        >
          <View
            style={[
              styles.shawdow,
              {
                borderRadius: 25,
                alignSelf: "center",
                margin: 3,
                backgroundColor: "#82B1FF",
              },
            ]}
          >
            <Image
              source={require("../../assets/images/website.png")}
              style={{ width: 180, height: 180 }}
              PlaceholderContent={<ActivityIndicator />}
            />
          </View>
          <Text
            style={{
              alignSelf: "center",
              fontSize: 46,
              fontFamily: "Helvetica",
              color: "#fff",
            }}
          >
            {Lang.auth_sign_up.signup}
          </Text>
        </View>
        <KeyboardAvoidingView
        //contentContainerStyle={{ flex: 1 }}
        //behavior={Platform.OS == "ios" ? "padding" : "height"}
        //keyboardVerticalOffset={-40}
        >
          <View
            style={[
              styles.container,
              { padding: 25, backgroundColor: paper.colors.surface },
            ]}
          >
            {show && (
              <DateTimePicker
                locale="es"
                testID="dateTimePicker"
                timeZoneOffsetInMinutes={0}
                value={new Date()}
                mode={mode}
                is24Hour={true}
                display="calendar"
                onChange={onChange}
                maximumDate={new Date()}
              />
            )}
            <View style={{ marginVertical: 20 }}>
              <HelperText type="info">Instructions!</HelperText>
              <HelperText type="error">
                * Email Must be a valid email address!
              </HelperText>
              <HelperText type="error">
                {"\t\t\t\t\t\t"}* It can not be updated later!
              </HelperText>
              <HelperText type="error">
                {"\t\t\t"}* Phone Number Must Be correct!
              </HelperText>
              <HelperText type="error">
                {"\t\t\t\t\t\t"}* For Verification.
              </HelperText>
              <HelperText type="error">
                {"\t\t\t\t\t\t"}* It can not be updated later!
              </HelperText>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                margin: 10,
                alignItems: "center",
              }}
            >
              <Text style={{ flexGrow: 1 }}>Gender:</Text>
              <TouchableOpacity
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
                onPress={() => setGender("Female")}
              >
                <Text style={{ marginRight: 12 }}>Female</Text>
                <RadioButton
                  value="Female"
                  status={gender === "Female" ? "checked" : "unchecked"}
                  onPress={() => setGender("Female")}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setGender("Male")}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text style={{ marginHorizontal: 12 }}>Male</Text>
                <RadioButton
                  value="Male"
                  status={gender === "Male" ? "checked" : "unchecked"}
                  onPress={() => setGender("Male")}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                margin: 10,
              }}
            >
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                }}
                onPress={showDatepicker}
              >
                <Icon
                  name="calendar-alt"
                  type="font-awesome-5"
                  color="green"
                  style={{ fontSize: 20 }}
                />
                <Text style={{ fontSize: 16, marginLeft: 12 }}>
                  {Lang.auth_sign_up.dob}:
                </Text>
                <Text
                  style={{
                    marginLeft: 5,
                    fontSize: 18,
                    color: "green",
                  }}
                >
                  {dob.toString().substr(4, 12)}
                </Text>
              </TouchableOpacity>
            </View>
            <Input
              ref={NametextInput}
              textContentType={"nameSuffix"}
              inputContainerStyle={styles.input}
              placeholder={Lang.auth_sign_up.name}
              returnKeyType="next"
              value={name}
              onChangeText={(n) => setName(n)}
              onSubmitEditing={() => PhnametextInput.current.focus()}
              blurOnSubmit={false}
              inputStyle={{ color: paper.colors.text }}
            />
            <Input
              ref={PhnametextInput}
              inputContainerStyle={styles.input}
              placeholder={Lang.auth_sign_up.ph}
              value={ph}
              returnKeyType="next"
              textContentType={"namePrefix"}
              keyboardType="phone-pad"
              onSubmitEditing={() => emailtextInput.current.focus()}
              ref={PhnametextInput}
              onBlur={() => PhnametextInput.current.blur()}
              blurOnSubmit={false}
              onChangeText={(n) => setPh(n)}
              inputStyle={{ color: paper.colors.text }}
            />

            <Input
              inputContainerStyle={styles.input}
              placeholder={Lang.auth_sign_up.email}
              value={email}
              onChangeText={(n) => setEmailAddress(n)}
              textContentType={"emailAddress"}
              onSubmitEditing={() => passnametextInput.current.focus()}
              ref={emailtextInput}
              onBlur={() => emailtextInput.current.blur()}
              returnKeyType="next"
              blurOnSubmit={false}
              inputStyle={{ color: paper.colors.text }}
            />
            <Input
              ref={passnametextInput}
              inputContainerStyle={styles.input}
              placeholder={Lang.pass}
              value={password}
              onChangeText={(n) => setPassword(n)}
              textContentType={"password"}
              secureTextEntry={true}
              onSubmitEditing={() => confrimpassnametextInput.current.focus()}
              inputStyle={{ color: paper.colors.text }}
            />
            <Input
              ref={confrimpassnametextInput}
              inputContainerStyle={styles.input}
              placeholder={Lang.auth_sign_up.cpass}
              value={cpassword}
              onChangeText={(n) => setCPassword(n)}
              textContentType={"password"}
              secureTextEntry={true}
              inputStyle={{ color: paper.colors.text }}
            />
            <Button
              type="outline"
              onPress={handleOnSignup}
              title={Lang.auth_sign_up.signup}
              containerStyle={[styles.shawdow, { borderRadius: 20 }]}
              loading={loading}
              disabled={loading}
              buttonStyle={{
                borderWidth: 2,
                borderColor: "#ff1744",
                borderRadius: 20,
              }}
              icon={{
                type: "antdesign",
                name: "addfile",
                size: 24,
                color: "#ff1744",
              }}
              titleStyle={{ color: "#ff1744" }}
              styles={{}}
            />
            <Button
              title={Lang.auth_sign_up.acc}
              onPress={goToLogin}
              titleStyle={{
                color: "#6200EE",
              }}
              containerStyle={{ marginTop: 20 }}
              type="clear"
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  Signup: {
    flex: 1,
    backgroundColor: "#009688",
  },
  shawdow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.54,
    shadowRadius: 10.32,
    elevation: 16,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: 10,
  },
  logoContainer: {
    marginBottom: 15,
    alignItems: "center",
  },
  buttonContainer: {
    margin: 25,
  },
  input: {
    marginBottom: 10,
  },
  checkBoxContainer: {
    backgroundColor: "#fff",
    borderColor: "#fff",
  },
  reg: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  shawdow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.54,
    shadowRadius: 10.32,
    elevation: 12,
    backgroundColor: "#ffffff",
  },
  toast: {
    margin: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.54,
    shadowRadius: 10.32,
    elevation: 12,
    borderRadius: 5,
  },
});
