import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Image } from "react-native-elements";
import { Button, Paragraph, Title, useTheme } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import SavingModel from "../components/SavingModel";
import { DOCTOR_VERIFICATION } from "../redux/actions/UserActions";

const DoctorVerificationScreen = () => {
  const paper = useTheme();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.User.TOKEN);
  const [model, setModel] = useState(false);
  const lists = [
    "Allergist",
    "Andrologist",
    "Anesthesiologist",
    "Cardiologist",
    "Cardiac Electrophysiologist",
    "Dermatologist",
    "Emergency Room",
    "Endocrinologist",
    "Epidemiologist",
    "Family Medicine Physician",
    "Gastroenterologist",
    "Hematologist",
    "Immunologist",
    "Infectious Disease",
    "Internal Medicine",
    "Oral Surgeon",
    "Medical Examiner",
    "Geneticist",
    "Neonatologist",
    "Nephrologist",
    "Neurologist",
    "Neuro Surgeon",
    "Gynecologist",
    "Ophthalmologist",
    "Orthopedist",
    "ENT Specialist",
    "Pathologist",
    "Hepatologist",
    "Vascular Surgeon",
    "Urologist",
    "Surgeon",
    "Spinal Cord",
    "Radiologist",
    "Plastic Surgeon",
  ];
  if (user?.role.includes("doctor")) {
    return (
      <View style={{ flex: 1, backgroundColor: paper.colors.surface }}>
        <View
          style={{
            display: "flex",
            flex: 1,
            margin: 20,
          }}
        >
          <View style={{ alignSelf: "center" }}>
            <Image
              source={require("../assets/images/fire-cracker.png")}
              style={{ width: 256, height: 256 }}
            />
          </View>

          <Title style={{ alignSelf: "center", marginBottom: 30 }}>
            Congratulation!
          </Title>
        </View>
      </View>
    );
  } else
    return (
      <View style={{ flex: 1, backgroundColor: paper.colors.surface }}>
        <View
          style={{
            display: "flex",
            flex: 1,
            margin: 20,
          }}
        >
          <View style={{ alignSelf: "center" }}>
            <Image
              source={require("../assets/images/authentication.png")}
              style={{ width: 256, height: 256 }}
            />
          </View>

          <Paragraph style={{ alignSelf: "center", marginBottom: 30 }}>
            Under Construction
          </Paragraph>
          <Button
            mode="contained"
            color="#009688"
            onPress={() => {
              setModel(true);
              dispatch(
                DOCTOR_VERIFICATION(
                  {
                    id: user._id,
                    licenseNo: "asdasd987a9s70",
                    specialty:
                      lists[Math.floor(Math.random() * (lists.length - 2))],
                  },
                  () => {
                    setTimeout(() => {
                      setModel(false);
                    }, 3000);
                  }
                )
              );
            }}
          >
            Submit
          </Button>
          <SavingModel visible={model} title="Submitting" />
        </View>
      </View>
    );
};

export default DoctorVerificationScreen;

const styles = StyleSheet.create({});
