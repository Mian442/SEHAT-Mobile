import { useRoute, useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, Image, Text } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import * as Yup from "yup";
import FormInput from "../../components/Common/FormInput";
import FormButton from "../../components/Common/FormButton";
import ErrorMessage from "../../components/Common/ErrorMessage";
import { ActivityIndicator } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  USER_STATUS_IN,
  USER_STATUS_LOGIN,
} from "../../redux/actions/UserActions";
import { useDispatch, useSelector } from "react-redux";
import { v5 as uuidv5 } from "uuid";
import { KeyboardAvoidingView } from "react-native";
import Animated from "react-native-reanimated";
import { Keyboard } from "react-native";
import { Toast } from "native-base";

const validationSchema = Yup.object().shape({
  email: Yup.string().label("Email").email("Enter a valid email"),
  password: Yup.string()
    .label("Password")
    .min(6, "Password must have at least 6 characters "),
});

function Login({ props }) {
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [imgheight, setImgheight] = useState(180);
  const [imgwidth, setImgwidth] = useState(180);
  const [rightIcon, setRightIcon] = useState("ios-eye");
  const passnametextInput = React.createRef();
  const emailnametextInput = React.createRef();
  const navigation = useNavigation();
  const height = Dimensions.get("window").height;
  const dispatch = useDispatch();
  const Lang = useSelector((state) => state.Language.Lang);
  function goToSignup() {
    console.log("press");
    return navigation.navigate("SignUp");
  }

  function goToForgotPassword() {
    return navigation.navigate("Reset");
  }

  function handlePasswordVisibility() {
    if (rightIcon === "ios-eye") {
      setRightIcon("ios-eye-off");
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === "ios-eye-off") {
      setRightIcon("ios-eye");
      setPasswordVisibility(!passwordVisibility);
    }
  }

  async function handleOnLogin(values, actions) {
    actions.setSubmitting(true);
    try {
      dispatch(
        USER_STATUS_LOGIN(values, () => {
          actions.setSubmitting(false);
        })
      );
    } catch (error) {
      Toast.show({
        text: "Failed To Login....",
        buttonText: "Okay",
        type: "danger",
        style: styles.toast,
      });
      actions.setSubmitting(false);
    }
  }

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
      Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
    };
  }, []);

  const _keyboardDidShow = (event) => {
    setImgheight(80);
    setImgwidth(80);
  };

  const _keyboardDidHide = (event) => {
    setImgheight(180);
    setImgwidth(180);
  };
  return (
    <>
      <>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={[
            styles.container,
            {
              display: "flex",
              justifyContent: "flex-end",
            },
          ]}
          keyboardVerticalOffset={-120}
        >
          <View
            style={{
              marginTop: "10%",
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
                source={require("../../assets/images/icon.png")}
                style={{ width: imgwidth, height: imgheight }}
              />
            </View>
            <View>
              <Text
                style={{
                  alignSelf: "center",
                  fontSize: 42,
                  fontFamily: "Helvetica",
                  color: "#fff",
                }}
              >
                {Lang?.app_name}
              </Text>
            </View>
            <View
              style={{
                backgroundColor: "#ffffff",
                borderTopEndRadius: 25,
                borderTopStartRadius: 25,
              }}
            >
              <Formik
                initialValues={{ email: "", password: "" }}
                onSubmit={(values, actions) => {
                  handleOnLogin(values, actions);
                }}
                validationSchema={validationSchema}
              >
                {({
                  handleChange,
                  values,
                  handleSubmit,
                  errors,
                  isValid,
                  touched,
                  handleBlur,
                  isSubmitting,
                }) => (
                  <View style={{ marginTop: 25 }}>
                    <FormInput
                      name="email"
                      value={values.email}
                      onChangeText={handleChange("email")}
                      placeholder={Lang?.email}
                      autoCapitalize="none"
                      iconName="envelope"
                      iconColor="#2C384A"
                      shadow={styles.shawdow}
                      onBlur={handleBlur("email")}
                      onSubmitEditing={(s) => passnametextInput.current.focus()}
                      blurOnSubmit={false}
                      returnKeyType="next"
                      ref={emailnametextInput}
                    />
                    <ErrorMessage errorValue={touched.email && errors.email} />
                    <FormInput
                      ref={passnametextInput}
                      name="password"
                      value={values.password}
                      onChangeText={handleChange("password")}
                      placeholder={Lang?.pass}
                      secureTextEntry={passwordVisibility}
                      iconName="lock"
                      autoCapitalize="none"
                      iconColor="#2C384A"
                      onBlur={handleBlur("password")}
                      shadow={styles.shawdow}
                      rightIcon={
                        <TouchableOpacity onPress={handlePasswordVisibility}>
                          <Ionicons
                            name={rightIcon}
                            size={28}
                            color="grey"
                            style={{ paddingRight: 13 }}
                          />
                        </TouchableOpacity>
                      }
                    />
                    <ErrorMessage
                      errorValue={touched.password && errors.password}
                    />
                    <View style={styles.buttonContainer}>
                      <FormButton
                        buttonType="solid"
                        onPress={handleSubmit}
                        title={Lang?.auth_login.login}
                        buttonColor="#fff"
                        disabled={!isValid || isSubmitting}
                        loadingStyle={{ color: "#f50057" }}
                        loading={isSubmitting}
                        styles={styles.shawdow}
                      />
                    </View>
                    <ErrorMessage errorValue={errors.general} />
                  </View>
                )}
              </Formik>
              <Button
                title={Lang?.auth_login.noacc}
                onPress={goToSignup}
                titleStyle={{
                  color: "#6200EE",
                }}
                type="clear"
              />
              <Button
                title={Lang?.auth_login.forget}
                onPress={goToForgotPassword}
                titleStyle={{
                  color: "#039BE5",
                }}
                type="clear"
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f50057",
    flex: 1,
  },
  logoContainer: {
    marginBottom: 15,
    alignItems: "center",
  },
  buttonContainer: {
    margin: 25,
  },
  tem: {
    borderRadius: 10,
  },
  Text: {
    margin: 25,
    fontSize: 32,
    fontStyle: "italic",
  },
  shawdow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 12,
    backgroundColor: "#FFF",
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

export default Login;
