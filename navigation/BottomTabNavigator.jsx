import { Icon } from "react-native-elements";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import Colors from "../constants/Colors";
import ProfileScreen from "../screens/ProfileScreen";
import HomeScreen from "../screens/HomeScreen";
import { IconButton, useTheme } from "react-native-paper";
import CategoryScreen from "../screens/CategoryScreen";
import FindDoctorScreen from "../screens/FindDoctorScreen";

const BottomTab = createMaterialTopTabNavigator();

export default function BottomTabNavigator({ navigation, route }) {
  // navigation.setOptions({
  //   headerTitle: getHeaderTitle(route),
  //   headerShown: getHeaderTitle(route) === "Profile" ? false : true,
  // });
  const paper = useTheme();
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: Colors.light.tint,
        indicatorStyle: { height: 0 },
        tabStyle: {
          height: 50,
          marginTop: 8,
        },
        style: {
          // borderTopLeftRadius: 30,
          // borderTopRightRadius: 30,
          backgroundColor: paper.colors.surface,
        },
        labelStyle: { fontSize: 8 },
        iconStyle: { width: 45 },
        inactiveTintColor: "gray",
        showIcon: true,
      }}
      tabBarPosition={"bottom"}
      shifting={true}
    >
      <BottomTab.Screen
        name="Home"
        component={TabOneNavigator}
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-home" type="ionicon" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Doctor"
        component={TabFourNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="user-md" type="font-awesome-5" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Category"
        component={TabThreeNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="nav-icon-grid-a" type="fontisto" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="user-cog" type="font-awesome-5" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

const HeaderOption = ({ navigation }) => {
  return {
    headerStyle: {
      backgroundColor: Colors.light.tint,
      // borderBottomLeftRadius: 30,
      // borderBottomRightRadius: 30,
    },
    headerTitleStyle: { color: "#fff" },
    headerTitleAlign: "center",
    headerTintColor: "#fff",
    headerLeftContainerStyle: { paddingLeft: 10 },
    headerRightContainerStyle: { paddingRight: 10 },
    headerLeft: () => (
      <IconButton
        icon="menu"
        color="#fff"
        size={32}
        onPress={() => navigation.openDrawer()}
      />
    ),
  };
};

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props) {
  return (
    <Icon size={24} name={props.name} type={props.type} color={props.color} />
  );
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator screenOptions={HeaderOption}>
      <TabOneStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerTitle: "SEHAT" }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator screenOptions={HeaderOption}>
      <TabTwoStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </TabTwoStack.Navigator>
  );
}

const TabThreeStack = createStackNavigator();

function TabThreeNavigator() {
  return (
    <TabThreeStack.Navigator screenOptions={HeaderOption}>
      <TabThreeStack.Screen name="Category" component={CategoryScreen} />
    </TabThreeStack.Navigator>
  );
}

const TabFourStack = createStackNavigator();

function TabFourNavigator() {
  return (
    <TabFourStack.Navigator screenOptions={HeaderOption}>
      <TabFourStack.Screen name="Find Doctor" component={FindDoctorScreen} />
    </TabFourStack.Navigator>
  );
}
