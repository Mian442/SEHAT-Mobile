import React from "react";
import { View, StyleSheet } from "react-native";
import {
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
  Divider,
} from "react-native-paper";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { HStack, Center, VStack } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Icon } from "react-native-elements";
import { SET_LANGUAGE } from "../redux/actions/LanguageAction";
import { USER_STATUS_OUT } from "../redux/actions/UserActions";
import { ScrollView } from "react-native";

export default function DrawerContent(props) {
  const is_eng = useSelector((state) => state.Language.IS_ENGLISH);
  const { drawer } = useSelector((state) => state.Language.Lang);
  const [isSwitchOn, setIsSwitchOn] = React.useState(is_eng);
  const dispatch = useDispatch();
  const User = useSelector((state) => state.User.TOKEN);
  const list = [
    {
      name: drawer.home,
      icon: "home",
      type: "font-awesome-5",
      screen: "Home",
    },
    {
      name: drawer.doctor,
      icon: "user-md",
      type: "font-awesome-5",
      screen: "Verify",
    },
    {
      name: drawer.consult_now,
      icon: "stethoscope",
      type: "font-awesome",
      screen: "Category",
    },
    // {
    //   name: drawer.appointment,
    //   icon: "md-bookmarks",
    //   type: "ionicon",
    //   screen: "Appointment",
    // },
    // {
    //   name: drawer.support,
    //   icon: "support",
    //   type: "font-awesome",
    //   screen: "Perception",
    // },
    {
      name: drawer.advance,
      icon: "list",
      type: "entypo",
      screen: "Advance",
    },
    {
      name: drawer.profile,
      icon: "profile",
      type: "ant-design",
      screen: "Profile",
    },
    {
      name: drawer.sign_out,
      icon: "logout",
      type: "ant-design",
      screen: "Profile",
    },
  ];

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props} showsVerticalScrollIndicator={false}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.drawerContent}>
            <View style={{ margin: 10 }}>
              <HStack space={3} alignItems="center" style={{ margin: 10 }}>
                <Center size={16} shadow={3}>
                  <Avatar
                    rounded
                    size={80}
                    overlayContainerStyle={{ backgroundColor: "#009688" }}
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
                </Center>
                <VStack style={{ margin: 10 }}>
                  <Center space={1}>
                    <Title style={styles.title}>{User.name}</Title>
                  </Center>
                  <Center space={1}>
                    <Caption style={styles.caption}>
                      @{User.role.includes("doctor") ? "Doctor" : "User"}
                    </Caption>
                  </Center>
                </VStack>
              </HStack>
            </View>
            <Divider style={{ backgroundColor: "gray", margin: 7 }} />
            <Drawer.Section style={styles.drawerSection} {...props}>
              {list.map((item, i) => (
                <TouchableRipple
                  onPress={() => {
                    if (item.name === "Sign Out") {
                      props.navigation.closeDrawer();
                      dispatch(USER_STATUS_OUT());
                    } else props.navigation.navigate(item.screen);
                  }}
                  style={{ paddingVertical: 6 }}
                  key={i}
                >
                  <View
                    style={[
                      styles.row,
                      {
                        marginHorizontal: 17,
                        marginVertical: 7,
                        justifyContent: "center",
                      },
                    ]}
                  >
                    <Icon type={item.type} name={item.icon} color="#009688" />
                    <Text
                      style={{
                        paddingLeft: 32,
                        color: "#009688",
                        flexGrow: 1,
                        textAlign: isSwitchOn ? "left" : "right",
                        fontSize: 16,
                      }}
                    >
                      {item.name}
                    </Text>
                  </View>
                </TouchableRipple>

                //<DrawerItem
                //       key={i + 11}
                //       {...props}
                //       icon={({ color, size }) => (
                //         <Icon
                //           type={item.type}
                //           name={item.icon}
                //           color={color}
                //           size={size}
                //         />
                //       )}
                //       label={item.name}
                //       onPress={() => {
                //         if (item.name === "Sign out") {
                //           props.navigation.closeDrawer();
                //           dispatch(USER_STATUS_OUT());
                //         } else props.navigation.navigate(item.screen);
                //       }}
                //     />
              ))}
            </Drawer.Section>
            <Drawer.Section title={drawer.preference}>
              <TouchableRipple
                onPress={() => {
                  dispatch(SET_LANGUAGE(!isSwitchOn ? "English" : "Urdu"));
                  setIsSwitchOn(!isSwitchOn);
                }}
              >
                <View style={styles.preference}>
                  <Text style={{ color: "#ff1744" }}>
                    {drawer.language_change}
                  </Text>
                  <View
                    pointerEvents="none"
                    style={{ display: "flex", flexDirection: "row" }}
                  >
                    <Text>{isSwitchOn ? "English" : "اردو"}</Text>
                    <Switch value={!isSwitchOn} />
                  </View>
                </View>
              </TouchableRipple>
            </Drawer.Section>
          </View>
        </ScrollView>
      </DrawerContentScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
    color: "#e0e0e0",
  },
});
