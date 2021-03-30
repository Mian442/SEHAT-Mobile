import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Title, useTheme } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import AppointmentCard from "../../components/Card/AppointmentCard";
import Loading from "../../components/Loading";
import { GET_APPOINTMENT } from "../../redux/actions/UserActions";
import { GET_APPOINTMENT as DOC_APPOINTMENT } from "../../redux/actions/DoctorAction";

export default function AppointmentScreen() {
  const paper = useTheme();
  const navigation = useNavigation();
  const { appointment } = useSelector((state) => state.Language.Lang);
  const { params } = useRoute();
  const user = useSelector((state) => state.User.TOKKEN);
  const info = useSelector((state) => state.User.info);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    navigation.setOptions({ title: appointment });
    navigation.addListener("focus", () => {
      if (params.data === "doctor") {
        dispatch(
          DOC_APPOINTMENT(user._id, () => {
            setTimeout(() => {
              setLoading(true);
            }, 3000);
          })
        );
      } else {
        dispatch(
          GET_APPOINTMENT(user._id, () => {
            setTimeout(() => {
              setLoading(true);
            }, 3000);
          })
        );
      }
    });
  }, [appointment]);
  if (!loading) {
    return <Loading />;
  } else
    return (
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          backgroundColor: paper.colors.surface,
        }}
      >
        {info ? (
          info?.map((item, i) => (
            <AppointmentCard
              key={i}
              list={item}
              handelButton={() => {
                console.log(item.name, i);
              }}
              role={params.data}
              pic={params.User.pic}
            />
          ))
        ) : (
          <Title>No Result</Title>
        )}
      </ScrollView>
    );
}
