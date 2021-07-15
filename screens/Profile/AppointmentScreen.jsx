import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Title, useTheme } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import AppointmentCard from "../../components/Card/AppointmentCard";
import Loading from "../../components/Loading";
import {
  DELETE_APPOINTMENT,
  GET_APPOINTMENT,
} from "../../redux/actions/UserActions";
import { GET_APPOINTMENT as DOC_APPOINTMENT } from "../../redux/actions/DoctorAction";
import SavingModel from "../../components/SavingModel";
import NoResult from "../../components/NoResult";

export default function AppointmentScreen() {
  const paper = useTheme();
  const navigation = useNavigation();
  const { appointment } = useSelector((state) => state.Language.Lang);
  const { params } = useRoute();
  const user = useSelector((state) => state.User.TOKEN);
  const info = useSelector((state) => state.User.info);
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState(false);
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
          backgroundColor: paper.colors.surface,
        }}
      >
        {info ? (
          info?.map((item, i) => (
            <AppointmentCard
              key={i}
              list={item}
              handelButton={() => {
                let data = {
                  doctor_id: item.doctor_id,
                  id: user._id,
                  appointment: { day: item.day, time: item.time },
                };
                setModel(true);
                dispatch(
                  DELETE_APPOINTMENT(data, () => {
                    setTimeout(() => {
                      setModel(false);
                    }, 3000);
                  })
                );
              }}
              role={params.data}
              pic={params.User.pic}
            />
          ))
        ) : (
          <NoResult />
        )}
        <SavingModel visible={model} title="Canceling" />
      </ScrollView>
    );
}
