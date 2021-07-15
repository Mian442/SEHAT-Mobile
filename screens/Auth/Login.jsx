import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Image, Text } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import * as Yup from "yup";
import FormInput from "../../components/Common/FormInput";
import FormButton from "../../components/Common/FormButton";
import ErrorMessage from "../../components/Common/ErrorMessage";
import { USER_STATUS_LOGIN } from "../../redux/actions/UserActions";
import { useDispatch, useSelector } from "react-redux";
import { KeyboardAvoidingView } from "react-native";
import { Keyboard } from "react-native";
import { ERROR } from "../../redux/actions/MessageAction";

const validationSchema = Yup.object().shape({
  field: Yup.string().required("Login Identifier is required"),
  password: Yup.string()
    .label("Password")
    .min(6, "Password must have at least 6 characters ")
    .required(),
});

function Login({ props }) {
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [imgHeight, setImgHeight] = useState(180);
  const [imgWidth, setImgWidth] = useState(180);
  const [rightIcon, setRightIcon] = useState("ios-eye");
  const passNameTextInput = React.createRef();
  const emailNameTextInput = React.createRef();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const Lang = useSelector((state) => state.Language.Lang);
  const phoneRegex = new RegExp(
    /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g
  );
  const emailRegex = new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  function goToSignup() {
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
    let data;
    if (phoneRegex.test(values.field)) {
      data = { ...values, type: "ph" };
    } else if (emailRegex.test(values.field)) {
      data = { ...values, type: "email" };
    } else {
      dispatch(ERROR({ content: "Not a valid Identifier!", type: "error" }));
      actions.setSubmitting(false);
    }
    if (data) {
      dispatch(
        USER_STATUS_LOGIN(data, () => {
          actions.setSubmitting(false);
        })
      );
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
    setImgHeight(80);
    setImgWidth(80);
  };

  const _keyboardDidHide = (event) => {
    setImgHeight(180);
    setImgWidth(180);
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
                styles.shadow,
                {
                  borderRadius: 25,
                  alignSelf: "center",
                  margin: 3,
                },
              ]}
            >
              <Image
                source={require("../../assets/images/New/icon.png")}
                style={{ width: imgWidth, height: imgHeight, borderRadius: 25 }}
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
                initialValues={{ field: "", password: "" }}
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
                      name="field"
                      value={values.email}
                      onChangeText={handleChange("field")}
                      placeholder={Lang?.email}
                      autoCapitalize="none"
                      iconName="envelope"
                      iconColor="#2C384A"
                      shadow={styles.shadow}
                      onBlur={handleBlur("field")}
                      onSubmitEditing={(s) => passNameTextInput.current.focus()}
                      blurOnSubmit={false}
                      returnKeyType="next"
                      ref={emailNameTextInput}
                    />
                    <ErrorMessage errorValue={touched.email && errors.email} />
                    <FormInput
                      ref={passNameTextInput}
                      name="password"
                      value={values.password}
                      onChangeText={handleChange("password")}
                      placeholder={Lang?.pass}
                      secureTextEntry={passwordVisibility}
                      iconName="lock"
                      autoCapitalize="none"
                      iconColor="#2C384A"
                      onBlur={handleBlur("password")}
                      shadow={styles.shadow}
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
                        styles={[styles.shadow, { borderRadius: 20 }]}
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
    backgroundColor: "#f50",
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
  shadow: {
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
