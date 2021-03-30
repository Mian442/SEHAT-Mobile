import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Icon, Image, Button } from "react-native-elements";
import { ActivityIndicator, RadioButton } from "react-native-paper";
import { useDispatch } from "react-redux";
import { LANGUAGE_STATUS, SET_LANGUAGE } from "../redux/actions/LanguageAction";

const LanguageScreen = () => {
  const [value, setValue] = useState("English");
  const dispatch = useDispatch();
  return (
    <View style={styles.Container}>
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
              backgroundColor: "#fff",
            },
          ]}
        >
          <Image
            source={require("../assets/images/translate.png")}
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
          Language
        </Text>
      </View>
      <View style={{ margin: 25 }}>
        <RadioButton.Group
          onValueChange={(value) => setValue(value)}
          value={value}
          style={{ color: "white" }}
        >
          <RadioButton.Item
            label="Urdu اردو"
            value="Urdu"
            color="#673ab7"
            labelStyle={{ color: "white" }}
            uncheckedColor="#fff"
          />
          <RadioButton.Item
            label="English انگریزی"
            value="English"
            color="#673ab7"
            labelStyle={{ color: "white" }}
            uncheckedColor="#fff"
          />
        </RadioButton.Group>
      </View>
      <View style={{ alignSelf: "flex-end", margin: 30 }}>
        <Button
          iconRight={true}
          icon={
            <Icon
              name="language"
              type="entypo"
              size={24}
              color="white"
              style={{ paddingHorizontal: 8 }}
            />
          }
          title="Select"
          buttonStyle={{ backgroundColor: "#009688" }}
          onPress={() => {
            dispatch(SET_LANGUAGE(value));
            dispatch(LANGUAGE_STATUS());
          }}
        />
      </View>
    </View>
  );
};

export default LanguageScreen;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#ff9800",
    justifyContent: "center",
  },
  shawdow: {
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.54,
    shadowRadius: 10.32,
    elevation: 12,
    backgroundColor: "#ff9800",
  },
});
