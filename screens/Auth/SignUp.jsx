import React, { useState } from "react";
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
import { Toast } from "native-base";
import { Picker } from "@react-native-picker/picker";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { USER_STATUS_REGISTER } from "../../redux/actions/UserActions";
import { v4 as uuidv4 } from "uuid";

const SignUp = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [dob, setDOB] = useState("");
  const [ph, setPh] = useState("");
  const [email, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("date");
  const [loading, setLoading] = useState(false);
  const [gender, setGender] = React.useState("");
  const navigation = useNavigation();
  const route = useRoute();
  const paper = useTheme();
  const dispatch = useDispatch();
  const Lang = useSelector((state) => state.Language.Lang);
  const LnametextInput = React.createRef();
  const FnametextInput = React.createRef();
  const PhnametextInput = React.createRef();
  const passnametextInput = React.createRef();
  const emailtextInput = React.createRef();

  let schema = yup.object().shape({
    fname: yup.string().required(),
    lname: yup.string().required(),
    ph: yup.number().required().min(10),
    dob: yup.date().required(),
    gender: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).max(32).required(),
  });

  function goToLogin() {
    return navigation.navigate("Login");
  }

  async function handleOnSignup() {
    setLoading(true);
    let data = {
      fname,
      lname,
      ph,
      dob,
      gender,
      email,
      password,
    };
    schema
      .validate(data, { abortEarly: false })
      .then((valid) => {
        console.log(valid);
        try {
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
        } catch (error) {
          Toast.show({
            text: "Something Went wrong",
            buttonText: "Okay",
            type: "danger",
            style: styles.toast,
          });
          setLoading(false);
        }
      })
      .catch((err) => {
        Toast.show({
          text: err.errors[0],
          buttonText: "Okay",
          type: "danger",
          style: styles.toast,
        });
        setLoading(false);
      });
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        // contentContainerStyle={{ flex: 1 }}
      >
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
                marginHorizontal: 10,
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
                <Text>Female</Text>
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
                <Text>Male</Text>
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
                <Text style={{ fontSize: 18, marginLeft: 5 }}>
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
              ref={FnametextInput}
              textContentType={"nameSuffix"}
              inputContainerStyle={styles.input}
              placeholder={Lang.auth_sign_up.fname}
              returnKeyType="next"
              value={fname}
              onChangeText={(n) => setFname(n)}
              onSubmitEditing={() => LnametextInput.current.focus()}
              blurOnSubmit={false}
              inputStyle={{ color: paper.colors.text }}
            />
            <Input
              inputContainerStyle={styles.input}
              placeholder={Lang.auth_sign_up.lname}
              value={lname}
              returnKeyType="next"
              textContentType={"namePrefix"}
              onChangeText={(n) => setLname(n)}
              onSubmitEditing={() => PhnametextInput.current.focus()}
              ref={LnametextInput}
              onBlur={() => LnametextInput.current.blur()}
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
              placeholder={Lang.email}
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
              inputStyle={{ color: paper.colors.text }}
            />
            <Button
              type="outline"
              onPress={handleOnSignup}
              title={Lang.auth_sign_up.signup}
              containerStyle={[styles.shawdow, {}]}
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
