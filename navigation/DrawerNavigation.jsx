import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerContent from "../components/Drawer";
import BottomTabNavigator from "./BottomTabNavigator";
import DetailScreen from "../screens/DetailScreen";
import ChatScreen from "../screens/ChatScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { useTheme } from "react-native-paper";
import HomeScreen from "../screens/HomeScreen";
import InfoScreen from "../screens/Profile/InfoScreen";
import AppointmentScreen from "../screens/Profile/AppointmentScreen";
import MedicalHistoryScreen from "../screens/Profile/MedicalHistoryScreen";
import PictureScreen from "../screens/PictureScreen";
import Preview from "../components/Picture/Preview";
import VitalScreen from "../screens/Profile/VitalScreen";
import MedicalStatusScreen from "../screens/Profile/MedicalStatusScreen";
import PerceptionScreen from "../screens/Profile/PerceptionScreen";
import BookAppointment from "../components/BookAppointment";
import List from "../components/List";
import CategoryList from "../components/CategoryList";
import DoctorProfile from "../components/DoctorProfile";
import RecordScreen from "../screens/Profile/RecordScreen";
import ServiceScreen from "../screens/Record/ServiceScreen";
import ExpertiseScreen from "../screens/Record/ExpertiseScreen";
import QualificationScreen from "../screens/Record/QualificationScreen";
import PublicationScreen from "../screens/Record/PublicationScreen";
import AchievementScreen from "../screens/Record/AchievementScreen";
import WorkExperienceScreen from "../screens/Record/WorkExperienceScreen";
import SchedulesScreen from "../screens/Profile/SchedulesScreen";
import ReviewsScreen from "../screens/Profile/ReviewsScreen";
import GivePerceptionScreen from "../screens/Profile/GivePerceptionScreen";
import FavoriteScreen from "../screens/Profile/FavoriteScreen";
import DoctorProfileScreen from "../screens/Profile/DoctorProfileScreen";
import SettingScreen from "../screens/Profile/SettingScreen";
import MedicalHistoryInsertion from "../components/Insertion/MedicalHistoryInsertion";
import MedicalStatusInsertion from "../components/Insertion/MedicalStatusInsertion";
import VitalCardInsertion from "../components/Insertion/VitalCardInsertion";
import DoctorVerificationScreen from "../screens/DoctorVerificationScreen";
import ChatListScreen from "../screens/ChatListScreen";
import Wallet from "../screens/Profile/Wallet";
import Amount from "../components/Amount";
import AdvanceFeatures from "../screens/AdvanceFeatures";
import PredictionModel from "../screens/AIModule/PredictionModel";
import MultipleSymptomPredictionModel from "../screens/AIModule/MultipleSymptomPredictionModel";
import ImageEnhancement from "../screens/AIModule/ImageEnhancement";
import SymptomPrediction from "../screens/AIModule/SymptomPrediction";
import Graphs from "../screens/AIModule/Graphs";
import ImageRegistration from "../screens/AIModule/ImageRegistration";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const HeaderOption = ({ navigation }) => {
  return {
    headerStyle: { backgroundColor: "#00e676" },
    headerTitleStyle: { color: "#fff" },
    headerTitleAlign: "center",
    headerTintColor: "#fff",
    headerShown: true,
  };
};

const StackNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName="Root"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Root" component={BottomTabNavigator} />
      <Stack.Screen
        name="Details"
        component={DetailScreen}
        options={HeaderOption}
      />
      <Stack.Screen name="Chat" component={ChatScreen} options={HeaderOption} />
      <Stack.Screen
        name="Chat List"
        component={ChatListScreen}
        options={HeaderOption}
      />
      <Stack.Screen name="Info" component={InfoScreen} options={HeaderOption} />
      <Stack.Screen
        name="DoctorInfo"
        component={DoctorProfileScreen}
        options={HeaderOption}
      />
      <Stack.Screen name="List" component={List} options={HeaderOption} />
      <Stack.Screen name="Wallet" component={Wallet} options={HeaderOption} />
      <Stack.Screen
        name="Advance"
        component={AdvanceFeatures}
        options={HeaderOption}
      />
      <Stack.Screen name="Amount" component={Amount} options={HeaderOption} />
      <Stack.Screen
        name="CategoryList"
        component={CategoryList}
        options={HeaderOption}
      />
      <Stack.Screen
        name="Favorite"
        component={FavoriteScreen}
        options={HeaderOption}
      />
      <Stack.Screen
        name="Verify"
        component={DoctorVerificationScreen}
        options={HeaderOption}
      />
      <Stack.Screen
        name="DoctorProfile"
        component={DoctorProfile}
        options={HeaderOption}
      />
      <Stack.Screen
        name="BookAppointment"
        component={BookAppointment}
        options={HeaderOption}
      />
      <Stack.Screen
        name="Pictures"
        component={PictureScreen}
        options={HeaderOption}
      />
      <Stack.Screen name="Preview" component={Preview} options={HeaderOption} />
      <Stack.Screen
        name="Image Enhancement"
        component={ImageEnhancement}
        options={HeaderOption}
      />
      <Stack.Screen
        name="Image Registration"
        component={ImageRegistration}
        options={HeaderOption}
      />
      <Stack.Screen
        name="Symptom Prediction"
        component={SymptomPrediction}
        options={HeaderOption}
      />
      <Stack.Screen
        name="Heart Disease"
        component={PredictionModel}
        options={HeaderOption}
      />
      <Stack.Screen name="Graphs" component={Graphs} options={HeaderOption} />
      <Stack.Screen
        name="Multiple Diseases"
        component={MultipleSymptomPredictionModel}
        options={HeaderOption}
      />
      <Stack.Screen
        name="Vital"
        component={VitalScreen}
        options={HeaderOption}
      />
      <Stack.Screen
        name="Edit Vitals"
        component={VitalCardInsertion}
        options={HeaderOption}
      />
      <Stack.Screen
        name="Appointment"
        component={AppointmentScreen}
        options={HeaderOption}
      />
      <Stack.Screen
        name="MedicalHistory"
        component={MedicalHistoryScreen}
        options={HeaderOption}
      />
      <Stack.Screen
        name="Edit Medical History"
        component={MedicalHistoryInsertion}
        options={HeaderOption}
      />
      <Stack.Screen
        name="MedicalStatus"
        component={MedicalStatusScreen}
        options={HeaderOption}
      />
      <Stack.Screen
        name="Edit Medical Status"
        component={MedicalStatusInsertion}
        options={HeaderOption}
      />
      <Stack.Screen
        name="Prescription"
        component={PerceptionScreen}
        options={HeaderOption}
      />
      <Stack.Screen
        name="Record"
        component={RecordScreen}
        options={HeaderOption}
      />
      <Stack.Screen
        name="Services"
        component={ServiceScreen}
        options={HeaderOption}
      />
      <Stack.Screen
        name="Expertise"
        component={ExpertiseScreen}
        options={HeaderOption}
      />
      <Stack.Screen
        name="Qualification"
        component={QualificationScreen}
        options={HeaderOption}
      />
      <Stack.Screen
        name="Publication"
        component={PublicationScreen}
        options={HeaderOption}
      />
      <Stack.Screen
        name="Achievements"
        component={AchievementScreen}
        options={HeaderOption}
      />
      <Stack.Screen
        name="Work Experience"
        component={WorkExperienceScreen}
        options={HeaderOption}
      />
      <Stack.Screen
        name="Schedules"
        component={SchedulesScreen}
        options={HeaderOption}
      />
      <Stack.Screen
        name="Reviews"
        component={ReviewsScreen}
        options={HeaderOption}
      />
      <Stack.Screen
        name="Give Prescription"
        component={GivePerceptionScreen}
        options={HeaderOption}
      />
      <Stack.Screen
        name="Setting"
        component={SettingScreen}
        options={HeaderOption}
      />
    </Stack.Navigator>
  );
};

const DrawerNavigation = () => {
  const paper = useTheme();
  console.log(paper);
  return (
    <Drawer.Navigator
      initialRouteName="Main"
      drawerContentOptions={{
        inactiveTintColor: "#009688",
        style: { backgroundColor: paper.colors.surface },
        contentContainerStyle: {
          backgroundColor: paper.colors.surface,
          flex: 1,
        },
      }}
      openByDefault={false}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Main"
        component={StackNavigator}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
