import React, { forwardRef } from "react";
import { Icon, Input } from "react-native-elements";
import { StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const FormInput = (
  {
    iconName,
    iconColor,
    returnKeyType,
    keyboardType,
    name,
    placeholder,
    onEndEditing,
    shadow,
    onFocus,
    onSubmitEditing,
    blurOnSubmit,
    ...rest
  },
  ref
) => (
  <View style={styles.inputContainer}>
    <Input
      {...rest}
      leftIcon={
        <Icon name={iconName} type="font-awesome" size={24} color={iconColor} />
      }
      leftIconContainerStyle={styles.iconStyle}
      placeholderTextColor="grey"
      name={name}
      placeholder={placeholder}
      style={{ paddingRight: 19 }}
      onEndEditing={onEndEditing}
      onFocus={onFocus}
      ref={ref}
      onSubmitEditing={onSubmitEditing}
      blurOnSubmit={blurOnSubmit}
      inputContainerStyle={[
        shadow,
        {
          borderBottomColor: "#fff",
          borderRadius: 25,
          paddingLeft: 20,
          backgroundColor: "#fff",
        },
      ]}
    />
  </View>
);

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 15,
    display: "flex",
    justifyContent: "center",
  },
  iconStyle: {
    marginRight: 7,
  },
});
const FormInputforwardref = forwardRef(FormInput, () => {});
export default FormInputforwardref;
