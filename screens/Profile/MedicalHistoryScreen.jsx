import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ActivityIndicator, Button, FAB, useTheme } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import MedicalHistoryCard from "../../components/Card/MedicalHistoryCard";
import MedicalHistoryInsertion from "../../components/Insertion/MedicalHistoryInsertion";
import { USER_INFORMATION } from "../../redux/actions/UserActions";

const MedicalHistoryScreen = () => {
  const [edit, setedit] = useState(false);
  const [loading, setLoading] = useState(false);
  const paper = useTheme();
  const navigation = useNavigation();
  const { medical_history } = useSelector((state) => state.Language.Lang);
  const info = useSelector((state) => state.User.info);
  const user = useSelector((state) => state.User.TOKKEN);
  const dispatch = useDispatch();
  useEffect(() => {
    navigation.setOptions({ title: medical_history.title });
    navigation.addListener("focus", () => {
      dispatch(
        USER_INFORMATION("medicalHistory", user._id, () => {
          setTimeout(() => {
            setLoading(true);
          }, 3000);
        })
      );
    });
  }, [medical_history, info]);
  if (!loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: paper.colors.surface,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator
          animating={true}
          color="#1de9b6"
          size={50}
          style={{}}
        />
      </View>
    );
  } else
    return (
      <View style={{ flex: 1, backgroundColor: paper.colors.surface }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flex: 1 }}
        >
          {!edit ? (
            <MedicalHistoryCard
              id={user._id}
              medicalHistory={
                info?.history?.length > 0 &&
                info?.history[info?.history?.length - 1]
              }
              handelButton={() => setedit(!edit)}
            />
          ) : (
            <MedicalHistoryInsertion
              id={user._id}
              handelButton={() => setedit(!edit)}
            />
          )}
        </ScrollView>
      </View>
    );
};

export default MedicalHistoryScreen;

const styles = StyleSheet.create({});
