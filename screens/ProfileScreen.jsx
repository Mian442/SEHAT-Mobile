import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Avatar, Icon, ListItem } from "react-native-elements";
import {
  Button,
  Headline,
  IconButton,
  Title,
  useTheme,
} from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

import { USER_STATUS_OUT } from "../redux/actions/UserActions";
export default () => {
  const navigation = useNavigation();
  const paper = useTheme();
  const dispatch = useDispatch();
  const User = useSelector((state) => state.User.TOKKEN);
  const list = [
    {
      name: "Patient Profile",
      icon: "ios-information-circle-outline",
      type: "ionicon",
      backcolor: "#00e676",
      screen: "Info",
      show: true,
    },
    {
      name: "Doctor Profile",
      icon: "profile",
      type: "antdesign",
      backcolor: "#2a3eb1",
      screen: "DoctorInfo",
      show: User?.role?.includes("doctor"),
    },
    {
      name: "Chat",
      icon: "chat",
      type: "entypo",
      backcolor: "#2a3eb1",
      screen: "Chat List",
      show: true,
    },
    {
      name: "Appointment",
      icon: "book-medical",
      type: "font-awesome-5",
      backcolor: "#ffc400",
      screen: "Appointment",
      show: true,
      data: "patient",
    },
    {
      name: "Medical History",
      icon: "history",
      type: "font-awesome-5",
      backcolor: "#00b0ff",
      screen: "MedicalHistory",
      show: true,
    },
    {
      name: "Vital",
      icon: "activity",
      type: "feather",
      backcolor: "#ff1744",
      screen: "Vital",
      show: true,
    },
    {
      name: "Medical Status",
      icon: "linechart",
      type: "antdesign",
      backcolor: "#651fff",
      screen: "MedicalStatus",
      show: true,
    },
    {
      name: "Prescription",
      icon: "prescription",
      type: "fontisto",
      backcolor: "#009688",
      screen: "Prescription",
      show: true,
    },
    {
      name: "Patient Appointment",
      icon: "md-bookmarks",
      type: "ionicon",
      backcolor: "#ed4b82",
      screen: "Appointment",
      show: User?.role?.includes("doctor"),
      data: "doctor",
    },
    {
      name: "Record",
      icon: "database",
      type: "font-awesome-5",
      backcolor: "#9c27b0",
      screen: "Record",
      show: User?.role?.includes("doctor"),
    },
    {
      name: "Schedules",
      icon: "md-time",
      type: "ionicon",
      backcolor: "#673ab7",
      screen: "Schedules",
      show: User?.role?.includes("doctor"),
    },
    {
      name: "Reviews",
      icon: "star",
      type: "antdesign",
      backcolor: "#f9a825",
      screen: "Reviews",
      show: User?.role?.includes("doctor"),
    },
    {
      name: "Give Prescription",
      icon: "draw",
      type: "material-community",
      backcolor: "#8d6e63",
      screen: "Give Prescription",
      show: User?.role.includes("doctor"),
    },
    {
      name: "Setting",
      icon: "gear",
      type: "font-awesome",
      backcolor: "#9e9e9e",
      screen: "Setting",
      show: true,
    },
  ];
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: "7.5%",
            alignItems: "center",
          }}
        >
          <IconButton
            icon="menu"
            color="#fff"
            size={38}
            style={{}}
            onPress={() => navigation.openDrawer()}
          />
        </View>

        <Avatar
          rounded
          size={280}
          overlayContainerStyle={{ backgroundColor: "#009688" }}
          onPress={() => console.log("Works!")}
          activeOpacity={0.7}
          containerStyle={{ alignSelf: "center" }}
          source={
            User?.pic === null
              ? User?.gender === "Male"
                ? require(`../assets/images/man.png`)
                : require(`../assets/images/woman.png`)
              : { uri: "data:image/jpeg;base64," + User?.pic }
          }
        />
        <View>
          <Text
            style={{
              alignSelf: "center",
              fontSize: 42,
              fontFamily: "Helvetica",
              color: "#fff",
            }}
          >
            {User.fname}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: paper.colors.background,
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            padding: 20,
          }}
        >
          {list.map(
            (item, i) =>
              item.show && (
                <TouchableOpacity
                  key={i}
                  activeOpacity={0.5}
                  onPress={() => {
                    navigation.navigate(item.screen, {
                      User,
                      data: item?.data,
                    });
                  }}
                >
                  <ListItem
                    bottomDivider
                    containerStyle={{
                      backgroundColor: paper.colors.background,
                    }}
                  >
                    <Icon
                      name={item.icon}
                      type={item.type}
                      color="#fff"
                      size={28}
                      style={{
                        backgroundColor: item.backcolor,
                        padding: 8,
                        borderRadius: 8,
                        width: 50,
                      }}
                    />
                    <ListItem.Content>
                      <Title>{item.name}</Title>
                    </ListItem.Content>
                    <ListItem.Chevron size={42} />
                  </ListItem>
                </TouchableOpacity>
              )
          )}
          <Button
            color="#00e5ff"
            mode="outlined"
            style={{
              borderWidth: 2,
              borderColor: "#00e5ff",
              margin: 15,
              borderRadius: 30,
            }}
            onPress={() => {
              dispatch(USER_STATUS_OUT());
            }}
          >
            Sign Out
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#00e5ff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
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
});
